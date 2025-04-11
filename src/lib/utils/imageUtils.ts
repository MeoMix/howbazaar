import imageVersions from '../config/imageVersions.json';
import { PUBLIC_CDN_URL } from '$env/static/public';

const useLocalImages = false;

export function getImageUrl(type: string, id: string): string {
    if (useLocalImages) {
        return `/images/${type}/${id}.avif`;
    }

    // NOTE: imageVersions currently contains names, but should contain ids as keys going forward.
    // Keep the names for now until the CDN is cleared of all old images in a ~week.
    const versions = imageVersions as Record<string, Record<string, number>>;
    const version = versions[type]?.[id];
    const baseUrl = `${PUBLIC_CDN_URL}images/${type}/${id}.avif`;
    
    return version ? `${baseUrl}?v=${version}` : baseUrl;
} 