import { AVAILABLE_VERSIONS } from '$lib/constants';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
    const seenVersions = AVAILABLE_VERSIONS.map(v => v.version);
    cookies.set('seenPatchVersions', JSON.stringify(seenVersions), {
        path: '/',
        maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    
    return json({ success: true });
}; 