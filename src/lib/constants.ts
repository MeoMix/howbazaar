import type { PatchVersion } from './types';

export const CURRENT_MAJOR_VERSION = '0.1.9';

export const AVAILABLE_VERSIONS: PatchVersion[] = [
    {
        version: '0.1.9-hotfix1',
        label: 'Version 0.1.9 Hotfix 1',
        path: '0.1.9-hotfix1/patchNotes.ts'
    },
    {
        version: '0.1.9',
        label: 'Version 0.1.9',
        path: '0.1.9/patchNotes.ts'
    },
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