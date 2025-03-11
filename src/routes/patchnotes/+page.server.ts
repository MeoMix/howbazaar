import { readFileSync } from 'fs';
import { join } from 'path';

export async function load() {
    // Read the patch notes file directly from the filesystem
    const patchNotesPath = join(process.cwd(), 'src/lib/db/patches/test-current/patchNotes.json');
    const patchNotesContent = readFileSync(patchNotesPath, 'utf-8');
    const patchNotes = JSON.parse(patchNotesContent);

    return {
        patchNotes
    };
}