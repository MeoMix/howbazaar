import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const url = new URL(event.request.url);

    // Normalize the pathname to handle trailing slashes
    let path = url.pathname.replace(/\/$/, ''); // Removes trailing slash (if present)

    const redirects: Record<string, string> = {
        '/donate': '/tip',
    };

    if (redirects[path]) {
        const destination = redirects[path] + url.search; // Preserve query parameters
        throw redirect(308, destination);
    }

    return resolve(event);
};
