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
		external: ['re2', 'better-sqlite3'],
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
		target: 'node20',
		sourcemap: false,

		rollupOptions: {
			external: ['re2', 'better-sqlite3'],
		},
	},
})