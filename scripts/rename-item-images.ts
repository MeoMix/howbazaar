import * as fs from 'fs';
import * as path from 'path';

// Directory containing your images
const directoryPath = './scripts/images/items/';

// Parse command-line arguments to check for dry run mode
const isDryRun = process.argv.includes('--dry-run');

// Check if a file ends with "_Mask.jpeg" and should be deleted
const shouldDelete = (fileName: string): boolean => {
  return fileName.endsWith('_Mask.jpeg') || fileName.endsWith('._FX.jpeg');
};

// Remove unwanted prefixes and suffixes from the filename
const cleanFileName = (fileName: string): string => {
    // Define one-off renaming rules
    const renameRules: { [key: string]: string } = {
      'Fangs': 'Fang',
      'BlueBananas': 'Bluenanas',
      'MedKit': 'Medkit',
      'Cinder': 'Cinders',
      'VialOfBlood': 'VialofBlood',
      'EyeOfTheColossus': 'EyeoftheColossus',
      'SoulOfTheDistrict': 'SouloftheDistrict',
      'Saphire': 'Sapphire',
      'GoodDog': 'Dog',
      'Bar of Gold': 'BarofGold',
      'ClockworkDaggers': 'ClockworkBlades',
      'GolfClub': 'GolfClubs',
      'CrowsNest': 'CrowsNest',
      'Forcefield': 'ForceField',
      'HakurvanLauncher': 'HakurvianLauncher',
      'SolarPanels': 'SolarFarm',
      'YoYo': 'YoYo',
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
      'Snowball': 'Icicle',
      'Fireballs': 'CharCole',
      'Snowtel': 'Igloo',
      'FlashGrenade': 'Flashbang',
      'CaptainsWheel': 'CaptainsWheel',
      'Seaweed1': 'Seaweed',
      'Ring': 'SoulRing',
      'AvantGuard': 'Cybersecurity',
      'Whip': 'MortalCoil',
      'Sickle': 'IcePick'
    };
  
    // Remove the "CF_" prefix and the following size identifier if present
    fileName = fileName.replace(/^CF_[SML]_/, '');
  
    // Remove any three-letter identifier if present
    fileName = fileName.replace(/^[A-Z]{3}_/, '');
  
    // Check if the file has any underscore suffix like "_D.jpeg" or "_D1.jpeg"
    const lastUnderscoreIndex = fileName.lastIndexOf('_');
    if (lastUnderscoreIndex !== -1) {
      // If there is an underscore in the suffix, remove it and everything after
      fileName = fileName.slice(0, lastUnderscoreIndex) + path.extname(fileName);
    }
  
    // Apply specific renaming rules if the filename matches any key in renameRules
    const baseName = path.basename(fileName, path.extname(fileName)); // Get base filename without extension
    if (renameRules[baseName]) {
      fileName = renameRules[baseName] + path.extname(fileName); // Replace base name and keep the extension
    }
  
    return fileName;
  };

// Process files with or without making changes based on dry run mode
const processFiles = () => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);

      // Check if the file should be deleted
      if (shouldDelete(file)) {
        if (isDryRun) {
          console.log(`[Dry Run] Would delete: ${file}`);
        } else {
          fs.unlink(filePath, err => {
            if (err) console.error(`Error deleting ${file}:`, err);
            else console.log(`Deleted ${file}`);
          });
        }
        return;
      }

      // Generate the new file name
      const newFileName = cleanFileName(file);
      const newFilePath = path.join(directoryPath, newFileName);

      // Check if renaming is needed
      if (newFileName !== file) {
        if (isDryRun) {
          console.log(`[Dry Run] Would rename ${file} to ${newFileName}`);
        } else {
          fs.rename(filePath, newFilePath, err => {
            if (err) console.error(`Error renaming ${file} to ${newFileName}:`, err);
            else console.log(`Renamed ${file} to ${newFileName}`);
          });
        }
      } else {
        console.log(`No renaming needed for: ${file}`);
      }
    });
  });
};

// Run the script
processFiles();
