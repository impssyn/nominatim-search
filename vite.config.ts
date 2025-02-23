import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	// ssr: {
	// 	noExternal: ['vue'],
	// },
	build: {
		outDir: './dist',
	},
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@components': path.resolve(__dirname, './src/components'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@types': path.resolve(__dirname, './src/types'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@public': path.resolve(__dirname, './public'),
		},
	},
})
