import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.set('seenMakPreview', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    
    return json({ success: true });
}; 