import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		host: '0.0.0.0'
	},
	build: {
		// NOTE: This impacts initial load performance but reduces the number of network requests
		// This saves on $$ and server load at the cost of hurting client performance.
		// In the future, it might make sense to revert this, but when paying for requests through Vercel,
		// it seems like this is too costly for such a small website.
		rollupOptions: {
			output: {
        		manualChunks: () => 'all.js'
			}
		},
		modulePreload: { polyfill: false }
	}
});
