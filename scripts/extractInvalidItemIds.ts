import fs from 'fs';
import path from 'path';
import cardsJson from './cards_old.json';

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
  '0d227497-f57f-44ef-98a8-15791e710fb6',
  // Dragon Heart
  '2f4625b6-42e1-42e8-9f50-82edf038fac1',
  // Calcinator:
  '3e3bda1d-81ba-4719-8772-417d8b834e99',
];

const allowedPackIds = [
  'Vanessa_Core',
  'Vanessa_Mysteries_of_the_Deep',
  'Pygmalien_Core',
  'Pyg_Frozen_Assets'
];

const disallowedList = [
  // Focused Core:
  'bfa28eec-84de-41cb-bc5c-8de700a5d21f',

  // Bulky Package:
  '35b7a978-275b-48f0-8e3d-9be2391c6a78',

  // Obsidian Shard:
  '8981892b-ce2a-43dc-a08e-2b5e8f8884fc',

  // "Gingerbread Man" (Joy isn't enabled currently),
  "8b2ce029-7f69-401c-9811-3a6398237a90"
];

// Filter the entries
const getIdsByCriteria = (data: any) => {
  return [...disallowedList, ...Object.values(data)
    .filter((entry: any) => entry.Type === "Item" &&
      entry.SpawningEligibility === "Never" &&
      !allowedList.includes(entry.Id) &&
      !allowedPackIds.includes(entry.CardPackId))
    .map((entry: any) => entry.Id)];
};

// Run the filter function
const filteredIds = getIdsByCriteria(cardsJson);

// Output the result
// console.log('Filtered Ids:', filteredIds);

// Optional: Save to a file
const filePath = path.resolve(`./src/lib/parsers/invalidItemIds.json`);
fs.writeFileSync(filePath, JSON.stringify(filteredIds, null, 2), 'utf-8');