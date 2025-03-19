import * as fs from 'fs';
import * as path from 'path';

import { deleteFiles } from './utils/fileUtils';
import parsedItemCards from "../src/lib/db/patches/latest/parsedItemCards";
import { removeSpecialCharacters } from './utils/stringUtils';
import { checkAndResizeImages, convertImagesToAvif } from './utils/imageUtils';

// Command:
// Needs to be whole folder - not all assets found in defaultlocalgroup_assets_all
// .\AssetStudioModCLI "C:\Program Files\Tempo Launcher - Beta\The Bazaar game_64\bazaarwinprodlatest\TheBazaar_Data\StreamingAssets\aa\StandaloneWindows64" --filter-by-name CF_,PNG_,Ectoplasm,Seaweed,Octopus,Snowflake -g none --image-format jpg -t tex2d -o ./items

// Results in missing these exports:
// Missing 10 item images: [
//   'Ectoplasm', //Ectoplasm
//   'BarofGold', // this one was just a file name issue
//   'IllusoRay', // this is because this one is formatted as PNG_S_VAN_IllusoRay
//   'ThievesGuildMedallion', // PNG_S_NTR_ThievesGuildMedallion
//   'Seaweed', // Seaweed1
//   'RedPigglesX', // duplicate file
//   'PeskyPete', // CF_S_Van_PeskyPete_D
//   'Barrel', // CF_M_Van_Barrel_D
//   'TinyCutlass', // Reuse cutlass
//   'Octopus', // Flat_Octopus
//   'Snowflake' //Snowflake
//   'FuelRod', //NuclearReactor
// ]

// Directory containing your images
const inputDirectory = './scripts/images/';
const assetType = 'items';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

// Remove unwanted prefixes and suffixes from the filename
const cleanFileName = (fileName: string): string => {
  // Define one-off renaming rules
  const renameRules: { [key: string]: string } = {
    'Fangs': 'Fang',
    'BlueBananas': 'Bluenanas',
    'Cinder': 'Cinders',
    'VialOfBlood': 'VialofBlood',
    'EyeOfTheColossus': 'EyeoftheColossus',
    'SoulOfTheDistrict': 'SouloftheDistrict',
    'Saphire': 'Sapphire',
    'GoodDog': 'Dog',
    'GoldBar': 'BarofGold',
    'ClockworkDaggers': 'ClockworkBlades',
    'GolfClub': 'GolfClubs',
    'CrowsNest': 'CrowsNest',
    'Forcefield': 'ForceField',
    'HakurvanLauncher': 'HakurvianLauncher',
    'SolarPanels': 'SolarFarm',
    'AlienLeeches': 'Leeches',
    'KirgSalamanderPup': 'SalamanderPup',
    'OuroborusStatue': 'OuroborosStatue',
    'CosmicAmulet1': 'CosmicAmulet',
    'CrusherClaw1': 'CrusherClaw',
    'TommyGun': 'TommooGun',
    'MortarandPestle': 'MortarPestle',
    'Silencer ': 'Silencer',
    'GumballRed': 'RedGumball',
    'GumballGreen': 'GreenGumball',
    'GumballBlue': 'BlueGumball',
    'GumballYellow': 'YellowGumball',
    'TuskBayonets': 'TuskedHelm',
    'PigglesRed': 'RedPigglesA',
    'PigglesYellow': 'YellowPigglesA',
    'PigglesBlue': 'BluePigglesA',
    'Snowball': 'Icicle',
    'Fireballs': 'CharCole',
    'Snowtel': 'Igloo',
    'FlashGrenade': 'Flashbang',
    'CaptainsWheel': 'CaptainsWheel',
    'Seaweed1': 'Seaweed',
    'Ring': 'SoulRing',
    'AvantGuard': 'Cybersecurity',
    'Whip': 'MortalCoil',
    'Sickle': 'IcePick',
    'Flat_Octopus': 'Octopus',
    'PickledAlienVeggies': 'PickledPeppers',
    'Blowtorch': 'BlowTorch',
    'ChronoBarrier': 'Chronobarrier',
    'DragonsTooth': 'DragonTooth',
    'DJCircuitBreaker': 'DJRob0t',
    'MarbleScaleMail': 'MarbleScalemail',
    'PepperMill': 'BlackPepper',
    'Claw': 'ClawArm',
    'Jaballianlongbow': 'JaballianLongbow',
    'JaballianDagger': 'PygmaliensDagger',
    'SlingShot': 'Slingshot',
    'BusyBees': 'BusyBee',
    'BelleLista': 'Bellelista',
    'ViciousTeddyBear': 'Teddy',
    'Boots': 'Bootstraps',
    'Dinonysus': 'MommaSaur',
    'TrappedDoor': 'BoobyTrap',
    'SwitchBlade': 'Switchblade',
    'Schematic': 'Schematics',
    'Chassis': 'CombatCore',
    'PowerCore': 'TheCore',
    'Contract': 'Ledger',
    'MetalSaw': 'Hacksaw',
    'Matryoshka': 'NestingDoll',
    'Stash': 'Lockbox',
    'EpicEpicureanChocolate': 'EpicureanChocolate',
    'DooleysBed': 'ChargingStation',
    'Chuck': 'Clawrence',
    'Balista': 'Ballista',
    'BuisnessCard': 'BusinessCard',
    'WallMaker': 'BrickBuddy',
    'Roburglars': 'MechMoles',
    'Titanium': 'Pyrocarbon',
    'AlienAxe': 'RuneAxe',
    'PowerShoes': 'AgilityBoots',
    'NuclearReactor': 'FuelRod',
    'ForkLift': 'Forklift',
    'Waterwheel': 'WaterWheel',
    'Silk': 'SilkScarf',
    'PreservedDragonsBreath': 'DragonsBreath',
    'snowmobile': 'Snowmobile',
    'DarkwaterAnglerfish (1)': 'DarkwaterAnglerfish',
    'Nanobots': 'Nanobot',
  };

  // Sometimes there's a literal space at the end of the filename. Madness.
  fileName = fileName.trim();

  // Remove the "CF_" prefix and the following size identifier if present
  fileName = fileName.replace(/^(CF|PNG)_[SML]_/, '');

  // Remove any three-letter identifier if present (Van, Pyg, etc)
  fileName = fileName.replace(/^[A-Z]{3}_/i, '');

  // Remove _D or _D1 from end of file name
  fileName = fileName.replace(/_D\d?$/, '');

  // Apply specific renaming rules if the filename matches any key in renameRules
  const baseName = path.basename(fileName, path.extname(fileName)); // Get base filename without extension
  if (renameRules[baseName]) {
    fileName = renameRules[baseName] + path.extname(fileName); // Replace base name and keep the extension
  }

  return fileName;
};

// TODO: This script should ideally intelligently copy files to the end directory
// Right now it triggers git commits on files which were (effectively) unmodified.
// Process files with or without making changes based on dry run mode
async function processItemImages() {
  await deleteKnownUselessFiles();

  // Parse data
  const itemCardNames = parsedItemCards.map(item => removeSpecialCharacters(item.name));

  console.log('Cleaning file names');
  await cleanFileNames();

  console.log('Duplicating files');
  await duplicateFiles();

  const files = await fs.promises.readdir(assetPath);

  // Create a map of file -> cleanFileName
  const fileCleanNameMap = new Map(files.map(file => [file, cleanFileName(path.parse(file).name)]));

  console.log('fileCleanNameMap', fileCleanNameMap);

  // Extract the clean filenames and card names into sets for quick lookups
  const cleanedFileNames = new Set(fileCleanNameMap.values());
  const itemCardNameSet = new Set(itemCardNames);

  // Determine missing file names
  const missingFileNames = itemCardNames.filter(cardName => !cleanedFileNames.has(cardName));

  // Exit if there are missing files
  if (missingFileNames.length > 0) {
    console.error(`Missing ${missingFileNames.length} item images:`, missingFileNames);
    return;
  }

  // Determine unused files
  const unusedFiles = Array.from(fileCleanNameMap.entries())
    .filter(([_, cleanName]) => !itemCardNameSet.has(cleanName))
    .map(([originalFile]) => originalFile);

  if (unusedFiles.length > 0) {
    console.log(`Unused files:`, unusedFiles);
    await deleteFiles(unusedFiles, assetPath);
  }

  await convertImagesToAvif(`${assetPath}`, `${inputDirectory}/${assetType}-avif`);
  await checkAndResizeImages(`${inputDirectory}/${assetType}-avif`, `${outputDirectory}/${assetType}`);
}

processItemImages().catch(console.error);

async function deleteKnownUselessFiles() {
  const files = await fs.promises.readdir(assetPath);
  const filesToDelete = files.filter(file =>
    file.endsWith('Mask.jpeg') ||
    file.endsWith('._FX.jpeg') ||
    file.endsWith('Portrait.jpeg') ||
    file.endsWith('PortraitBG.jpeg') ||
    // There's two files both named "Feather" and only one is correct (the purple feather)
    file.endsWith('CF_S_STE_Feather_D.jpeg') ||
    /_#\d{1,10}\.jpeg$/.test(file) // Matches '_#<numbers>.jpeg', where <numbers> is 1-10 digits
  );

  await deleteFiles(filesToDelete, assetPath);
}

async function cleanFileNames() {
  const files = await fs.promises.readdir(assetPath);

  // Extract full file names, including extensions
  for (const file of files) {
    const filePath = path.join(assetPath, file);

    const { name, ext } = path.parse(file); // Split file name and extension
    const newFileName = `${cleanFileName(name)}${ext}`; // Append the cleaned name with the original extension
    const newFilePath = path.join(assetPath, newFileName);

    if (newFileName !== file) {
      try {
        await fs.promises.rename(filePath, newFilePath);
        console.log(`Renamed ${file} to ${newFileName}`);
      } catch (err) {
        console.error(`Error renaming ${file} to ${newFileName}:`, err);
      }
    } else {
      console.log(`No renaming needed for: ${file}`);
    }
  }
}

async function duplicateFiles() {
  // Map of files to duplicate
  const duplicateMappings = {
    'RedPigglesA': ['RedPigglesX', 'RedPigglesL', 'RedPigglesR'],
    'YellowPigglesA': ['YellowPigglesX', 'YellowPigglesL', 'YellowPigglesR'],
    'BluePigglesA': ['BluePigglesX', 'BluePigglesL', 'BluePigglesR'],
    // TODO: It's weird this is needed?
    'Cutlass': ['TinyCutlass']
  };

  try {
    const files = await fs.promises.readdir(assetPath);
    const missingFiles: string[] = [];

    for (const [sourceFile, targetFiles] of Object.entries(duplicateMappings)) {
      // Find source file by name regardless of extension
      const sourceMatch = files.find(file => path.parse(file).name === sourceFile);

      if (sourceMatch) {
        const sourceFilePath = path.join(assetPath, sourceMatch);
        const sourceExt = path.extname(sourceMatch);

        for (const targetFile of targetFiles) {
          const targetFilePath = path.join(assetPath, `${targetFile}${sourceExt}`);

          try {
            // Copy the file
            await fs.promises.copyFile(sourceFilePath, targetFilePath);
            console.log(`Copied ${sourceMatch} to ${targetFile}${sourceExt}`);
          } catch (err) {
            console.error(`Error copying ${sourceMatch} to ${targetFile}${sourceExt}:`, err.message);
          }
        }
      } else {
        missingFiles.push(sourceFile);
      }
    }

    // Log missing files
    if (missingFiles.length > 0) {
      console.error('The following files were not found:', missingFiles.join(', '));
    }
  } catch (err) {
    console.error('Error reading directory:', err.message);
  }
}