import * as fs from 'fs';
import * as path from 'path';

interface CardData {
  m_Name: string;
  cardGUID: string;
}

// Name corrections for items that need their display names fixed
const NAME_CORRECTIONS: Record<string, string> = {
    'PigglesYellow': 'Yellow Piggles A',
    'PigglesRed': 'Red Piggles R',
    'PigglesBlue': 'Blue Piggles A'
};

// Fixes for items with invalid or incorrect GUIDs in their card data
const INVALID_GUID_FIXES: Record<string, string> = {
    // For some reason ATM's cardGUID maps to a Dooley skill?
    'ATM': 'c926fac8-f9ba-4430-a01a-a71a32c501c7'
};

// Additional card variants that don't exist in the source card data
const ADDITIONAL_CARD_VARIANTS: Record<string, string> = {
    'Blue Piggles R': '1d8d4dea-aaf9-4041-aa54-ae133f552d55',
    'Blue Piggles L': '2df8f38b-bb9f-4247-afe9-525067c9e29e',
    'Blue Piggles X': '8124f91b-3b4f-40ae-9493-057a0be7feb9',
    'Red Piggles A': '844efa15-de6f-4fec-a438-21904969577b',
    'Red Piggles L': 'b3c06ff9-f0e1-4527-81aa-2f71d7bf6503',
    'Red Piggles X': '48d24eb0-d953-409c-9602-1d3d4c4278c5',
    'Yellow Piggles R': '3868bcee-4463-4c34-9a9b-b1ab1fa49260',
    'Yellow Piggles L': 'd8e476dd-8184-4cb5-8cca-df1cb66c4305',
    'Yellow Piggles X': 'd4586506-d4d6-45d5-866b-796203f8d9d3',
    'Tiny Cutlass': '97d8654e-532b-4960-8f5b-5822562d3450'
};

async function processCardDataFiles(): Promise<Map<string, string>> {
  const cardDataDir = './scripts/images/items_carddata';
  const cardGuidToName = new Map<string, string>();

  try {
    const files = await fs.promises.readdir(cardDataDir);
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const filePath = path.join(cardDataDir, file);
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      const cardData = JSON.parse(fileContent) as CardData;

      // Remove _CardData suffix from m_Name
      const name = cardData.m_Name.replace('_CardData', '');
      
      // Apply name correction if needed
      const correctedName = NAME_CORRECTIONS[name] || name;
      
      // Remove all spaces from the name
      const nameWithoutSpaces = correctedName.replace(/\s+/g, '');
      
      // Use corrected GUID if it exists, otherwise use the cardGUID
      const guid = INVALID_GUID_FIXES[correctedName] || cardData.cardGUID;
      cardGuidToName.set(guid, nameWithoutSpaces);
    }

    // Add the additional card variants that don't exist in card data
    Object.entries(ADDITIONAL_CARD_VARIANTS).forEach(([name, guid]) => {
      if (!cardGuidToName.has(guid)) {
        const nameWithoutSpaces = name.replace(/\s+/g, '');
        cardGuidToName.set(guid, nameWithoutSpaces);
      }
    });

    return cardGuidToName;
  } catch (error) {
    console.error('Error processing card data files:', error);
    throw error;
  }
}

// Execute and write results to file
processCardDataFiles().then(hashmap => {
  const outputPath = './scripts/cardGuidToName.json';
  const jsonData = JSON.stringify(Object.fromEntries(hashmap), null, 2);
  
  return fs.promises.writeFile(outputPath, jsonData, 'utf-8')
    .then(() => {
      console.log(`Successfully wrote card GUID mappings to ${outputPath}`);
    });
}).catch(console.error); 