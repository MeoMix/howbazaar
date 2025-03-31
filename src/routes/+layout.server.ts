import { AVAILABLE_VERSIONS } from '$lib/constants';

export async function load({ cookies }) {
    // Get seen versions from cookie
    const seenVersionsCookie = cookies.get('seenPatchVersions');
    const seenVersions = seenVersionsCookie ? JSON.parse(seenVersionsCookie) : [];

    // Check if user has seen the Mak preview banner
    const hasSeenMakPreview = cookies.get('seenMakPreview') === 'true';

    return {
        hasNewVersions: AVAILABLE_VERSIONS.some(version => !seenVersions.includes(version.version)),
        hasSeenMakPreview
    };
}