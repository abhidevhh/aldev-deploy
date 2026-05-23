import 'dotenv/config'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { envOnlyMacros } from 'vite-env-only'
import { cjsInterop } from 'vite-plugin-cjs-interop'
import tsconfigPaths from 'vite-tsconfig-paths'

const MODE = process.env.NODE_ENV

export default defineConfig({
	server: {
		allowedHosts: ['aldev-deploy.onrender.com'],
	},


	resolve: {
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
	},
	ssr: {
		noExternal: [
			'@react-router',
			'vite-env-only',
		],
		external: ['re2'],
		target: 'node',
	},



	plugins: [
		cjsInterop({
			dependencies: [
				'md5-hash',
				'@remark-embedder/core',
				'@remark-embedder/transformer-oembed',
			],
		}),

		envOnlyMacros(),

		tailwindcss(),

		reactRouter({
			appDirectory: 'app',
			future: {},
		}),

		tsconfigPaths(),
	],


	build: {
		sourcemap: false,
		cssMinify: MODE === 'production',

		rollupOptions: {
			external: ['re2'],
			output: {
				manualChunks: undefined,
			},
		},
	},
})
