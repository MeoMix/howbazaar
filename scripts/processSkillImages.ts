import * as fs from 'fs/promises';
import path from 'path';

import parsedSkillCards from "../src/lib/processedSkillCards.json" assert { type: "json" };
import type { ParsedCardSkill } from "../src/lib/types.ts";
import { removeSpecialCharacters } from './utils/stringUtils.ts';
import { deleteFiles } from './utils/fileUtils.ts';
import { checkAndResizeImages, convertImagesToAvif } from './utils/imageUtils.ts';

// Command:
// .\AssetStudioModCLI "C:\Program Files\Tempo Launcher - Beta\The Bazaar game_64\bazaarwinprodlatest\TheBazaar_Data\StreamingAssets\aa\StandaloneWindows64\defaultlocalgroup_assets_all.bundle" --filter-by-name Icon_SKILL -g none -t tex2d -o ./skills

// Initially missing skills from the original export given to me by Book:
// 'Icon_SKILL_MON_ToxicFriendship',
// 'Icon_SKILL_MON_ExtremeComfort',
// 'Icon_SKILL_MON_CleanStorefront',
// 'Icon_SKILL_MON_AugmentedWeaponry',
// 'Icon_SKILL_MON_AugmentedDefenses',
// 'Icon_SKILL_MON_PurifyingFlame'
const inputDirectory = './scripts/images/';
const assetType = 'skills';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

// TODO: This seems to be appending (1) onto files in a failure scenario
async function renameSkillImages() {
    const skillCards = parsedSkillCards as ParsedCardSkill[];

    // Collect skillArtEntries with artKey and corresponding name without spaces
    const skillArtEntries = skillCards.map(({ name, artKey }) => {
        const nameWithoutSpecialCharacters = removeSpecialCharacters(name);
        const artKeyWithoutExtension = path.parse(artKey).name; // Remove file extension from artKey
        return { artKey: artKeyWithoutExtension, nameWithoutSpecialCharacters, name };
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

    for (const { artKey, nameWithoutSpecialCharacters } of skillArtEntries) {
        const originalFile = files.find(file => path.parse(file).name === artKey);
        if (originalFile) {
            const originalFilePath = `${assetPath}${originalFile}`;
            const newFilePath = `${assetPath}${nameWithoutSpecialCharacters}${path.extname(originalFile)}`;

            // Rename the file if the new name is different from the current name
            if (originalFilePath !== newFilePath) {
                await fs.rename(originalFilePath, newFilePath);
                console.log(`Renamed "${originalFile}" to "${nameWithoutSpecialCharacters}${path.extname(originalFile)}"`);
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

    await convertImagesToAvif(`${assetPath}`, `${inputDirectory}/${assetType}-avif`);
    await checkAndResizeImages(`${inputDirectory}/${assetType}-avif`, `${outputDirectory}/${assetType}`);
}

renameSkillImages().catch(console.error);
