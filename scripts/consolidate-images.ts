import * as fs from 'fs';
import * as path from 'path';

const imageDir = './scripts/images/items/';

const imagesToKeep = [
    'JunkyardCatapult', 'Grenade',
    'Grapeshot',        'PowderKeg',
    'ShieldPotion',     'ForceField',
    'BagofJewels',      'TurtleShell',
    'Pearl',            'BagofJewels',
    'SniperRifle',      'Silencer',
    'Barrel',           'Disguise',
    'Trebuchet',        'RocketLauncher',
    'SunlightSpear'
];

// Set dryRun to true for testing without deleting files
const isDryRun = process.argv.includes('--dry-run');

function deleteUnwantedImages(dir: string, keepList: string[]) {
    // Get all files in the directory
    const files = fs.readdirSync(dir);

    // Filter out files that are not in the keep list (compare only base name without extension)
    const filesToDelete = files.filter(file => {
        const baseName = path.parse(file).name; // Extract file name without extension
        return !keepList.includes(baseName);
    });

    if (isDryRun) {
        console.log('Dry run: The following files would be deleted:');
        filesToDelete.forEach(file => console.log(file));
    } else {
        filesToDelete.forEach(file => {
            const filePath = path.join(dir, file);
            try {
                fs.unlinkSync(filePath);
                console.log(`Deleted: ${file}`);
            } catch (error) {
                console.error(`Error deleting file ${file}:`, error);
            }
        });
    }
}

// Execute the function
deleteUnwantedImages(imageDir, imagesToKeep);
