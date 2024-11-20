import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { svelte } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// https://svelte.dev/docs/kit/adapter-vercel
		adapter: adapter({
			images: {
				sizes: [256],
				formats: ['image/avif'],
				// Serving all images locally - hash will change when image content changes and invalidate the cache
				// So, prefer a really long cache expiration (1yr) to save on bandwidth.
				minimumCacheTTL: 31536000,
				domains: []
			}
		})
	},

	plugins: [
		svelte({
			compilerOptions: {
				// Enable strict mode to enforce Svelte 5 syntax
				strict: true
			}
		})
	]
};

export default config;
