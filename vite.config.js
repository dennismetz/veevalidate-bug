import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
	base: process.env.NODE_ENV === 'development' ? '/' : '/',
	plugins: [
		vue()
	],
	resolve: {
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
		alias: {

			// shortcuts for imports
			'@': path.resolve(__dirname, 'src'),

			// style dependencies
			'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
		}
	},
	server: {
		host: '0.0.0.0',
		port: 3333,
		hot: true,
		open: false,
		cors: true
	},
	build: {
		manifest: true,
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true
			}
		}
	}
});
