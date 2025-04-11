import imageVersions from '../config/imageVersions.json';
import { PUBLIC_CDN_URL } from '$env/static/public';

const useLocalImages = false;

export function getImageUrl(type: string, name: string): string {
    if (useLocalImages) {
        return `/images/${type}/${name}.avif`;
    }

    const versions = imageVersions as Record<string, Record<string, number>>;
    const version = versions[type]?.[name];
    const baseUrl = `${PUBLIC_CDN_URL}images/${type}/${name}.avif`;
    
    return version ? `${baseUrl}?v=${version}` : baseUrl;
} 