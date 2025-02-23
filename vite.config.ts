import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@/styles/index.scss" as *;
`,
			},
		},
	},
	build: {
		outDir: './dist',
	},
	resolve: {
		alias: {
			'@/api': path.resolve(__dirname, './src/api'),
			'@/app': path.resolve(__dirname, './src/app'),
			'@/components': path.resolve(__dirname, './src/components'),
			'@/stores': path.resolve(__dirname, './src/stores'),
			'@/assets': path.resolve(__dirname, './src/shared/assets'),
			'@/consts': path.resolve(__dirname, './src/shared/consts'),
			'@/helpers': path.resolve(__dirname, './src/shared/helpers'),
			'@/styles': path.resolve(__dirname, './src/shared/styles'),
			'@/types': path.resolve(__dirname, './src/shared/types'),
			'@/public': path.resolve(__dirname, './public'),
		},
	},
})
