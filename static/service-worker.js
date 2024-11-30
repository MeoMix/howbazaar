const CACHE_NAME = 'image-cache-v1';

// This value matches the number of images in /static/images/**/*
// find ./static/images -maxdepth 3 -type f | wc -l
// TODO: It would be nice to be able to set this via the build process
const MAX_CACHE_ENTRIES = 817;

async function cleanCache(cache) {
    const keys = await cache.keys();
    const excessEntries = keys.length - MAX_CACHE_ENTRIES;
    if (excessEntries > 0) {
        for (let i = 0; i < excessEntries; i++) {
            await cache.delete(keys[i]); // Delete the oldest entries
        }
    }
}

self.addEventListener('fetch', event => {
    if (event.request.destination === 'image') {
        const url = new URL(event.request.url);
        if (!url.pathname.startsWith('/images/')) {
            console.log('ignoring image with url:', url.pathname);			
            return;
        }

        event.respondWith((async () => {
            const cachedResponse = await caches.match(event.request);
            console.log('cache response for url:', url.pathname, cachedResponse);
            if (cachedResponse) {
                return cachedResponse;
            }
            try {
                const networkResponse = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, networkResponse.clone());
                console.log('caching image:', url.pathname);
                await cleanCache(cache);
                return networkResponse;
            } catch (error) {
                // Optionally handle fetch errors
                return caches.match('/images/fallback.png');
            }
        })());
    }
});

self.addEventListener('activate', event => {
    // Optionally clean up old caches
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});