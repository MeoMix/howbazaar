import type { PatchNotes } from '$lib/types';

// Import all patch notes files statically
const modules = import.meta.glob('$lib/db/patches/*/patchNotes.ts');

interface PatchVersion {
    version: string;
    label: string;
    path: string;
}

const AVAILABLE_VERSIONS: PatchVersion[] = [
    {
        version: '0.1.8-hotfix1',
        label: 'Version 0.1.8 Hotfix 1',
        path: '0.1.8-hotfix1/patchNotes.ts'
    },
    {
        version: '0.1.8',
        label: 'Version 0.1.8',
        path: '0.1.8/patchNotes.ts'
    }
];

export async function load({ url }) {
    const requestedVersion = url.searchParams.get('version') || AVAILABLE_VERSIONS[0].version;
    const selectedVersion = AVAILABLE_VERSIONS.find(v => v.version === requestedVersion) || AVAILABLE_VERSIONS[0];

    // Use the glob-imported module
    const module = modules[`/src/lib/db/patches/${selectedVersion.path}`];

    if (!module) {
        throw new Error(`Could not find patch notes for version ${selectedVersion.version}`);
    }

    const { default: patchNotes } = await module() as { default: PatchNotes };

    return {
        patchNotes,
        versions: AVAILABLE_VERSIONS,
        currentVersion: selectedVersion.version
    };
}