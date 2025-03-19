import type { PatchNotes } from '$lib/types';
import { AVAILABLE_VERSIONS } from '$lib/constants';

// Import all patch notes files statically
const modules = import.meta.glob('$lib/db/patches/*/patchNotes.ts');

export async function load({ url, cookies }) {
    const requestedVersion = url.searchParams.get('version') || AVAILABLE_VERSIONS[0].version;
    const selectedVersion = AVAILABLE_VERSIONS.find(v => v.version === requestedVersion) || AVAILABLE_VERSIONS[0];

    // Use the glob-imported module
    const module = modules[`/src/lib/db/patches/${selectedVersion.path}`];

    if (!module) {
        throw new Error(`Could not find patch notes for version ${selectedVersion.version}`);
    }

    const { default: patchNotes } = await module() as { default: PatchNotes };

    // Get viewMode from cookie, default to "full"
    const viewMode = cookies.get('patchNotesViewMode') as "full" | "compact" || "full";

    return {
        patchNotes,
        versions: AVAILABLE_VERSIONS,
        currentVersion: selectedVersion.version,
        viewMode
    };
}