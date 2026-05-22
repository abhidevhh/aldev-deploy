import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import {
	createRequestHandler,
	type RequestHandler,
} from '@react-router/express'
import {
	init as sentryInit,
	setContext as sentrySetContext,
} from '@sentry/react-router'
import { ip as ipAddress } from 'address'
import chalk from 'chalk'
import closeWithGrace from 'close-with-grace'
import compression from 'compression'
import express from 'express'
import getPort, { portNumbers } from 'get-port'
import helmet from 'helmet'
import morgan from 'morgan'
import onFinished from 'on-finished'
import { type ServerBuild } from 'react-router'
import serverTiming from 'server-timing'
import sourceMapSupport from 'source-map-support'
import { type WebSocketServer } from 'ws'
import { getEnv } from '../app/utils/env.server'
import { getInstanceInfo } from '../app/utils/litefs-js.server'

sourceMapSupport.install()

const localServerModuleExtension = import.meta.url.includes('/server-build/')
	? '.js'
	: ''

async function importLocalServerModule<T>(specifier: string): Promise<T> {
	return (await import(`${specifier}${localServerModuleExtension}`)) as T
}

const { scheduleExpiredDataCleanup } = await importLocalServerModule<
	typeof import('./expired-sessions-cleanup')
>('./expired-sessions-cleanup')
const { createRateLimitingMiddleware } =
	await importLocalServerModule<typeof import('./rate-limiting')>(
		'./rate-limiting',
	)
const { getRedirectsMiddleware, oldImgSocial, rickRollMiddleware } =
	await importLocalServerModule<typeof import('./redirects')>('./redirects')
const { registerStartupShortcuts } = await importLocalServerModule<
	typeof import('./startup-shortcuts')
>('./startup-shortcuts')

const env = getEnv()
const MODE = env.NODE_ENV

const viteDevServer =
	MODE === 'production'
		? undefined
		: await import('vite').then((vite) =>
				vite.createServer({
					server: { middlewareMode: true },
				}),
			)

const getBuild = async (): Promise<ServerBuild> => {
	const allowedActionOrigins = env.allowedActionOrigins

	if (viteDevServer) {
		const build = (await viteDevServer.ssrLoadModule(
			'virtual:react-router/server-build',
		)) as any
		return { ...build, allowedActionOrigins }
	}
	// @ts-ignore (this file may or may not exist yet)
	const build = (await import('../build/server/index.js')) as any
	return { ...build, allowedActionOrigins }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const here = (...d: Array<string>) => path.join(__dirname, ...d)
const primaryHost = 'abhidev.com'
const getHost = (req: { get: (key: string) => string | undefined }) =>
	req.get('X-Forwarded-Host') ?? req.get('host') ?? ''

const SHOULD_INIT_SENTRY =
	MODE === 'production' &&
	Boolean(env.SENTRY_DSN) &&
	// `start:mocks` (used in CI + local e2e) runs with `MOCKS=true`.
	!env.MOCKS

if (SHOULD_INIT_SENTRY) {
	void importLocalServerModule<typeof import('./utils/monitoring')>(
		'./utils/monitoring',
	).then(({ init }) => init())
}

if (SHOULD_INIT_SENTRY) {
	sentryInit({
		dsn: env.SENTRY_DSN,
		tracesSampleRate: 0.3,
		environment: env.NODE_ENV,
	})
	sentrySetContext('fly', {
		region: env.FLY_REGION,
		machineId: env.FLY_MACHINE_ID,
	})
}

const app = express()
// fly is our proxy
app.set('trust proxy', true)
app.use(serverTiming())

type ServerTimingResponse = {
	startTime?: (name: string, description: string) => void
	endTime?: (name: string) => void
	headersSent?: boolean
}

const startServerMetric = (
	res: ServerTimingResponse,
	name: string,
	description: string,
) => {
	res.startTime?.(name, description)
}

const endServerMetric = (res: ServerTimingResponse, name: string) => {
	// `server-timing` auto-ends open metrics when response headers are written.
	// If we try to end the same metric after that, it logs `No such name ...`.
	if (res.headersSent) return
	res.endTime?.(name)
}

const expiredDataCleanup = scheduleExpiredDataCleanup()

app.get('/img/social', oldImgSocial)

// TODO: remove this once all clients are updated
app.post('/__metronome', (req: any, res: any) => {
	res.status(503)
	return res.send('Metronome is deprecated and no longer in use.')
})

app.use((req, res, next) => {
	const metricName = 'middleware-get-instance-info'
	startServerMetric(res, metricName, 'populate fly response headers')
	getInstanceInfo()
		.then(({ currentInstance, primaryInstance }) => {
			res.set('X-Powered-By', 'Kody the Koala')
			res.set('X-Fly-Region', env.FLY_REGION)
			res.set('X-Fly-App', env.FLY_APP_NAME)
			res.set('X-Fly-Instance', currentInstance)
			res.set('X-Fly-Primary-Instance', primaryInstance)
			res.set('X-Frame-Options', 'SAMEORIGIN')
			const proto = req.get('X-Forwarded-Proto') ?? req.protocol

			const host = getHost(req)
			if (!host.endsWith(primaryHost)) {
				res.set('X-Robots-Tag', 'noindex')
			}
			res.set('Access-Control-Allow-Origin', `${proto}://${host}`)

			// if they connect once with HTTPS, then they'll connect with HTTPS for the next hundred years
			res.set(
				'Strict-Transport-Security',
				`max-age=${60 * 60 * 24 * 365 * 100}`,
			)
		})
		.then(() => next())
		.catch(next)
		.finally(() => endServerMetric(res, metricName))
})

app.use((req, res, next) => {
	const proto = req.get('X-Forwarded-Proto')
	const host = getHost(req)
	if (proto === 'http') {
		res.set('X-Forwarded-Proto', 'https')
		res.redirect(`https://${host}${req.originalUrl}`)
		return
	}
	next()
})

// Redirect www and blog subdomains to canonical URLs (replaces Netlify forwarding)
app.use((req, res, next) => {
	const host = getHost(req)
	if (host === 'www.abhidev.com') {
		res.redirect(301, `https://abhidev.com${req.originalUrl}`)
		return
	}
	if (host === 'blog.abhidev.com') {
		res.redirect(
			301,
			`https://abhidev.com/blog${req.path === '/' ? '' : req.path}${req.url.slice(req.path.length)}`,
		)
		return
	}
	next()
})

app.all(
	'{*splat}',
	getRedirectsMiddleware({
		redirectsString: fs.readFileSync(here('./_redirects.txt'), 'utf8'),
	}),
)

app.use((req, res, next) => {
	if (req.path.endsWith('/') && req.path.length > 1) {
		const query = req.url.slice(req.path.length)
		const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
		res.redirect(301, safepath + query)
	} else {
		next()
	}
})

app.use(compression())

const publicAbsolutePath = here('../build/client')
const transistorUploadsAbsolutePath = here('../.cache/transistor-uploads')

if (viteDevServer) {
	app.use(viteDevServer.middlewares)
} else {
	app.use(
		express.static(publicAbsolutePath, {
			maxAge: '1w',
			setHeaders(res, resourcePath) {
				const relativePath = resourcePath.replace(`${publicAbsolutePath}/`, '')
				if (relativePath.startsWith('build/info.json')) {
					res.setHeader('cache-control', 'no-cache')
					return
				}
				// If we ever change our font (which we quite possibly never will)
				// then we'll just want to change the filename or something...
				// Remix fingerprints its assets so we can cache forever
				if (
					relativePath.startsWith('fonts') ||
					relativePath.startsWith('build')
				) {
					res.setHeader('cache-control', 'public, max-age=31536000, immutable')
				}
			},
		}),
	)
}

app.use(
	'/mock/transistor/uploads',
	express.static(transistorUploadsAbsolutePath, { fallthrough: false }),
)

app.get(
	[
		'/build/{*splat}',
		'/images/{*splat}',
		'/fonts/{*splat}',
		'/favicons/{*splat}',
	],
	(req: any, res: any) => {
		// if we made it past the express.static for /build, then we're missing something. No bueno.
		return res.status(404).send('Not found')
	},
)

// log the referrer for 404s
app.use((req, res, next) => {
	onFinished(res, () => {
		const referrer = req.get('referer')
		if (res.statusCode === 404 && referrer) {
			console.info(
				`👻 404 on ${req.method} ${req.path} referred by: ${referrer}`,
			)
		}
	})
	next()
})

app.use(
	morgan(
		(tokens, req, res) => {
			try {
				const host = getHost(req)
				return [
					tokens.method?.(req, res),
					`${host}${decodeURIComponent(tokens.url?.(req, res) ?? '')}`,
					tokens.status?.(req, res),
					tokens.res?.(req, res, 'content-length'),
					'-',
					tokens['response-time']?.(req, res),
					'ms',
				].join(' ')
			} catch (error: unknown) {
				console.error(
					`Error generating morgan log line`,
					error,
					req.originalUrl,
				)
				return ''
			}
		},
		{
			skip: (req, res) => {
				if (res.statusCode !== 200) return false
				// skip health check related requests
				const headToRoot = req.method === 'HEAD' && req.originalUrl === '/'
				const getToHealthcheck =
					req.method === 'GET' && req.originalUrl === '/healthcheck'
				return headToRoot || getToHealthcheck
			},
		},
	),
)

app.use(
	createRateLimitingMiddleware({
		mode: MODE,
		mocks: env.MOCKS,
	}),
)

app.use((req, res, next) => {
	res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
	next()
})

app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		contentSecurityPolicy: {
			directives: {
				'connect-src': [
					...(MODE === 'development' ? ['ws:'] : []),
					"'self'",
				].filter(Boolean),
				'font-src': ["'self'"],
				'frame-src': [
					"'self'",
					'youtube.com',
					'www.youtube.com',
					'youtu.be',
					'youtube-nocookie.com',
					'www.youtube-nocookie.com',
					'player.simplecast.com',
					'egghead.io',
					'app.egghead.io',
					'calendar.google.com',
					'codesandbox.io',
					'share.transistor.fm',
					'codepen.io',
				],
				'img-src': [
					"'self'",
					'data:',
					'res.cloudinary.com',
					'www.gravatar.com',
					'cdn.usefathom.com',
					'pbs.twimg.com',
					'i.ytimg.com',
					'image.simplecastcdn.com',
					'images.transistor.fm',
					'img.transistor.fm',
					'img.transistorcdn.com',
					'*.githubusercontent.com',
					'https://lh4.googleusercontent.com', // a google form that was embedded in a x post...
					'i2.wp.com',
					'i1.wp.com',
					'og-image-react-egghead.now.sh',
					'og-image-react-egghead.vercel.app',
					'www.epicweb.dev',
					...(MODE === 'development'
						? ['cloudflare-ipfs.com', 'cdn.jsdelivr.net']
						: []),
				],
				'media-src': [
					"'self'",
					'res.cloudinary.com',
					'data:',
					'blob:',
					'www.dropbox.com',
					'*.dropboxusercontent.com',
				],
				'script-src': [
					"'strict-dynamic'",
					"'unsafe-eval'",
					"'self'",
					'cdn.usefathom.com',
					// @ts-expect-error middleware is the worst
					(req, res) => `'nonce-${res.locals.cspNonce}'`,
				],
				'script-src-attr': [
					"'unsafe-inline'",
					// TODO: figure out how to make the nonce work instead of
					// unsafe-inline. I tried adding a nonce attribute where we're using
					// inline attributes, but that didn't work. I still got that it
					// violated the CSP.
				],
				'upgrade-insecure-requests': null,
			},
		},
	}),
)

app.get('/redirect.html', rickRollMiddleware)

// CORS support for /.well-known/*
app.options('/.well-known/{*splat}', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS')
	res.header(
		'Access-Control-Allow-Headers',
		req.header('Access-Control-Request-Headers') || '*',
	)
	res.sendStatus(204)
})

app.use('/.well-known/{*splat}', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

async function getRequestHandler(): Promise<RequestHandler> {
	function getLoadContext(req: any, res: any) {
		return { cspNonce: res.locals.cspNonce }
	}
	return createRequestHandler({
		build: MODE === 'development' ? getBuild : await getBuild(),
		mode: MODE,
		getLoadContext,
	})
}

app.use((req, res, next) => {
	const metricName = 'middleware-request-handler'
	startServerMetric(
		res,
		metricName,
		'time spent in react-router request handling',
	)
	// `server-timing` auto-ends unfinished metrics when headers are written.
	next()
})

getRequestHandler().then((handler) => {
	app.all('{*splat}', handler)
})


const PORT = Number(process.env.PORT || 10000)

console.log("STARTING SERVER...")
console.log("PORT =", PORT)

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`)
})

