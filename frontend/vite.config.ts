import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import path from 'path';

import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: 'node_modules/pyodide/*.*',
					dest: './pyodide',
				},
			],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
