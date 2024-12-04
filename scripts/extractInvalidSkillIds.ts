import fs from 'fs';
import path from 'path';
import cardsJson from './v2_Cards.json';

const allowedList = [
  // Corrosive Toxins:
  'b8f04ea6-ecdd-46a0-9ae6-397a090d294b',
  // Burning Shield:
  '7931571a-3d32-41e8-bf7b-ca6b4d1b7a3d'
];

// Filter the entries
const getIdsByCriteria = (data: any) => {
  return Object.values(data)
    .filter((entry: any) => entry.Type === "Skill" && entry.SpawningEligibility === "Never" && !allowedList.includes(entry.Id))
    .map((entry: any) => entry.Id);
};

// Run the filter function
const filteredIds = getIdsByCriteria(cardsJson);

// Output the result
console.log('Filtered Ids:', filteredIds);

// Optional: Save to a file
const filePath = path.resolve(`./src/lib/parsers/invalidSkillIds.json`);
fs.writeFileSync(filePath, JSON.stringify(filteredIds, null, 2), 'utf-8');