import * as fs from 'fs/promises';
import path from 'path';

import parsedSkillCards from "../src/lib/db/patches/latest/parsedSkillCards";
import { removeSpecialCharacters } from './utils/stringUtils.ts';
import { copyAndRenameFiles, deleteFiles } from './utils/fileUtils.ts';
import { checkAndResizeImages, convertImagesToAvif } from './utils/imageUtils.ts';

// Command:
// .\AssetStudioModCLI "C:\Program Files\Tempo Launcher - Beta\The Bazaar game_64\bazaarwinprodlatest\TheBazaar_Data\StreamingAssets\aa\StandaloneWindows64\defaultlocalgroup_assets_all.bundle" --filter-by-name Icon_SKILL -g none -t tex2d -o ./skills

const inputDirectory = './scripts/images/';
const assetType = 'skills';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

// TODO: This seems to be appending (1) onto files in a failure scenario
async function renameSkillImages() {
    // Collect skillArtEntries with artKey and corresponding name without spaces
    const skillArtEntries = parsedSkillCards.map(({ name, artKey }) => {
        const nameWithoutSpecialCharacters = removeSpecialCharacters(name);
        const artKeyWithoutExtension = path.parse(artKey).name; // Remove file extension from artKey
        return { artKey: artKeyWithoutExtension, nameWithoutSpecialCharacters, name };
    // TODO: Why do I need to filter this here? Should filter out earlier if a card doesn't have an artKey.
    }).filter(entry => !!entry.artKey);

    // Get file names in the local directory (without extensions)
    const files = await fs.readdir(assetPath);
    const localFileNames = files.map(file => path.parse(file).name); // Exclude file type from names

    // Identify missing files by comparing artKeys to local file names
    const stillMissing = skillArtEntries.filter(({ artKey }) => !localFileNames.includes(artKey));

    // Exit if there are missing files
    if (stillMissing.length > 0) {
        console.error(`Missing ${stillMissing.length} skill images:`, stillMissing.map(({ artKey, name }) => `${artKey} ${name}`));
        return;
    }

    // Rename files and collect unused files
    const renamedFiles = new Set<string>();
    const processedArtKeys = new Map<string, string>(); // Map of artKey to its current file path

    for (const { artKey, nameWithoutSpecialCharacters } of skillArtEntries) {
        const originalFile = files.find(file => path.parse(file).name === artKey);
        if (originalFile) {
            const originalFilePath = `${assetPath}${originalFile}`;
            const newFilePath = `${assetPath}${nameWithoutSpecialCharacters}${path.extname(originalFile)}`;

            // If this artKey has been processed before, copy from its current location
            if (processedArtKeys.has(artKey)) {
                const sourcePath = processedArtKeys.get(artKey)!;
                await fs.copyFile(sourcePath, newFilePath);
                console.log(`Copied "${path.basename(sourcePath)}" to "${nameWithoutSpecialCharacters}${path.extname(originalFile)}"`);
            } else {
                // First time seeing this artKey, move the file
                if (originalFilePath !== newFilePath) {
                    await fs.rename(originalFilePath, newFilePath);
                    console.log(`Renamed "${originalFile}" to "${nameWithoutSpecialCharacters}${path.extname(originalFile)}"`);
                }
                processedArtKeys.set(artKey, newFilePath);
            }

            // Add the original file name to renamedFiles
            renamedFiles.add(originalFile);
        }
    }

    // Delete files that weren't renamed (exclude files that were renamed by original name)
    const unusedFiles = files.filter(file => !renamedFiles.has(file));
    await deleteFiles(unusedFiles, assetPath);

    console.log("All skill images renamed and unused files deleted.");

    // TODO: sanitizeFileNames ?

    const copiedFiles = await copyAndRenameFiles(foundImages, assetPath, `${inputDirectory}/${assetType}-renamed`);
    await convertImagesToAvif(`${assetPath}`, `${inputDirectory}/${assetType}-avif`);
    await checkAndResizeImages(`${inputDirectory}/${assetType}-avif`, `${outputDirectory}/${assetType}`);
}

renameSkillImages().catch(console.error);
