import fs from 'fs';
import path from 'path';
import cardsJson from './v2_Cards.json';

const allowedList = [
  // Arc Blaster:
  'aaa7d8fc-dd1b-42b3-9ea0-3b982f2f3790',
  // Fuel Rod:
  'b9d4df16-0876-45ee-a35e-700d7b68cb6f',
  // Red Button:
  '8eb91c44-0e07-4e89-8cad-dfe99b8ef443',
  // Truffles:
  '2aab9e1b-8c8d-49d0-be45-5884731ebb08',
  // Piggy Bank:
  '855cf2a5-930b-43db-b388-9f814f80a4fb',
  // Black Ice:
  'f0a58209-1a26-42ac-a243-7c2fd9d6ce33',
  // Boomerang:
  'af43730d-efaa-4a1d-adeb-bf31d536acf0',
  // Dragon Wing:
  '292115b4-a145-476e-b3a7-0fe199b5c1af',
  // Dragon's Breath:
  '5a94a820-1b13-4164-bae9-f6abbd59eb2d',
  // Salt
  'f1c04562-6db4-45d5-a056-a4df9d185faf',
  // Hot Sauce
  'c0455f22-2fb9-4ce6-a65f-e874e3d86ff0',
  // Skillet
  '0d227497-f57f-44ef-98a8-15791e710fb6'
];

const disallowedList = [
  // Loupe Debug:
  '0fa524e3-c2a4-4509-b91a-6b9d60da5e07',

  // Focused Core:
  'bfa28eec-84de-41cb-bc5c-8de700a5d21f',

  // [Debug] Regen Crit Giver:
  '15ec15d3-b255-45a9-ad0b-543f72249752',
];

// Filter the entries
const getIdsByCriteria = (data: any) => {
  return [...disallowedList, ...Object.values(data)
    .filter((entry: any) => entry.Type === "Item" && entry.SpawningEligibility === "Never" && !allowedList.includes(entry.Id))
    .map((entry: any) => entry.Id)];
};

// Run the filter function
const filteredIds = getIdsByCriteria(cardsJson);

// Output the result
// console.log('Filtered Ids:', filteredIds);

// Optional: Save to a file
const filePath = path.resolve(`./src/lib/parsers/invalidItemIds.json`);
fs.writeFileSync(filePath, JSON.stringify(filteredIds, null, 2), 'utf-8');