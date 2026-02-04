import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/cmc': {
				target: 'https://pro-api.coinmarketcap.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/cmc/, ''),
				secure: false,
			}
		}
	}
});
