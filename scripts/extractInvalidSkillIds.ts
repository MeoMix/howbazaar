import fs from 'fs';
import path from 'path';
import cardsJson from './v2_Cards.json';

const allowedList = [
  // Corrosive Toxins:
  'b8f04ea6-ecdd-46a0-9ae6-397a090d294b',
  // Burning Shield:
  '7931571a-3d32-41e8-bf7b-ca6b4d1b7a3d',
  // Machine Learning:
  'd1e825ba-653c-4993-8002-50c3933c5827',
  // Electrified Hull
  '1df8d85a-9095-4ab9-952a-c668a4d5d51c',
  // Heavy Firepower
  'e634860d-fec5-43c1-a6ca-a349450ae9c8',
  // Tiny Dancer
  '36410add-d0de-4618-a099-ceb32a87c589',
  // Noisy Cricket
  'c38468ba-2636-4818-a821-6fb7e73d7110',
  // Invigorating Blade
  '549263e2-4ab4-4fe8-a552-e94486b3e91b',
  // CPU Throttling
  '3dd2dbac-97ee-4fc4-ac31-4d885d19e2ed',
  // Toxic Flame
  'cbd2810c-4713-4503-a97d-30e73ccaebb7',
  // Loaded Fury
  'a80d8cc7-3472-45cb-ac33-11fe7e583e42',
  // Toxic Weapons
  '202e4917-e744-41bf-965a-81edcded9d5f',
];

const disallowedList = [
  // Cauterize:
  "7e32e9be-23d1-4d3f-a103-0a0db10bc4f4",
  // Rapid Thaw:
  "4589a64c-fdc8-4334-a2c7-05a3a8b2c5da",
  // Stout Fire:
  // "d08bdeb9-ef08-48be-9df7-0edd9fcff6cf"
  // "[DEBUG] Defense Grid"
  "69edc2fa-7aba-457e-bbcf-05f2e0f18139"
];

// Filter the entries
const getIdsByCriteria = (data: any) => {
  return [...disallowedList, ...Object.values(data)
    .filter((entry: any) => entry.Type === "Skill" && entry.SpawningEligibility === "Never" && !allowedList.includes(entry.Id))
    .map((entry: any) => entry.Id)];
};

// Run the filter function
const filteredIds = getIdsByCriteria(cardsJson);

// Output the result
// console.log('Filtered Ids:', filteredIds);

// Optional: Save to a file
const filePath = path.resolve(`./src/lib/parsers/invalidSkillIds.json`);
fs.writeFileSync(filePath, JSON.stringify(filteredIds, null, 2), 'utf-8');