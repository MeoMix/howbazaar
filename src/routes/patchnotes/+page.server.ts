import { readFileSync } from 'fs';
import { join } from 'path';

interface PatchVersion {
    version: string;
    label: string;
    path: string;
}

const AVAILABLE_VERSIONS: PatchVersion[] = [
    {
        version: '0.1.8-hotfix1',
        label: 'Version 0.1.8 Hotfix 1',
        path: '0.1.8-hotfix1/patchNotes.json'
    },
    {
        version: '0.1.8',
        label: 'Version 0.1.8',
        path: '0.1.8/patchNotes.json'
    }
];

export async function load({ url }) {
    const requestedVersion = url.searchParams.get('version') || AVAILABLE_VERSIONS[0].version;
    const selectedVersion = AVAILABLE_VERSIONS.find(v => v.version === requestedVersion) || AVAILABLE_VERSIONS[0];

    // Read the patch notes file for the selected version
    const patchNotesPath = join(process.cwd(), 'src/lib/db/patches', selectedVersion.path);
    const patchNotesContent = readFileSync(patchNotesPath, 'utf-8');
    const patchNotes = JSON.parse(patchNotesContent);

    return {
        patchNotes,
        versions: AVAILABLE_VERSIONS,
        currentVersion: selectedVersion.version
    };
}