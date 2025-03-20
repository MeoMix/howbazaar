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

  // Vanessa_Mysteries_of_the_Deep Expansion Pack:
  // Primordial Depth Charge
  'b18e28e6-69a3-455a-8a5a-1a3170c76bb7',
  // Volcanic Vents
  'cd06b93f-ed76-40ac-a3f5-0cbb7fcc5aac',
  // Slumbering Primordial
  '9b739ba9-9278-45cb-9635-9ae48ac942c7',
  // Dive Weights
  'ce6769db-f9a6-44a8-b915-afec472a2ea3',
  // Zoarcid
  '3191df3b-7e7d-4df9-9395-6fffd4207f6d',
  // Yeti Crab
  '8048bd3a-1529-4a21-872d-20da84b223a3',
  // Submersible
  '47057461-8cb1-46d2-982c-a7ca6df131c7',
  // Diving Helmet
  'fb6e6b16-d6d0-4493-ac3f-46c26afe6c51',
  // Mantis Shrimp
  'd5110378-323c-4af3-93e5-dca3451b3ea8',
  // Darkwater Anglerfish
  '961e974b-5472-4298-b66b-e1f74c167c26',

  // Pyg_Frozen_Assets Expansion Pack:
  // Luxury Kiuas
  '25035a36-1105-4ef9-81b0-c5bb6926415b',
  // Private Hot Springs
  '2e0be4f0-0472-444a-a541-09f1ba464c64',
  // VIP Pass
  '02f42044-50df-4c3a-abbd-942903953b79',
  // Cold Room
  '6546e26d-d3a2-4b57-96ca-357f4be5c375',
  // Steam Ladle
  '194572c8-39b0-4dea-92d5-2c97f8d59554',
  // Ice Luge
  '9d31868e-1c69-4186-a3df-8ca10dc2a80f',
  // Snow Mobile
  '6c0af8cf-273f-43c5-afb5-ef00c87ffcc8',
  // Hot Stones
  'cdea14ac-23d0-43c2-95b3-12cedab1795a',
  // Aurora Dome
  'bb101259-4d30-4d93-9d69-b99c08f17488',
  // Sauna
  '21c858b6-6f6e-4bc5-9e84-3722b3dd813a'
];

const disallowedList = [
  // Loupe Debug:
  '0fa524e3-c2a4-4509-b91a-6b9d60da5e07',

  // Focused Core:
  'bfa28eec-84de-41cb-bc5c-8de700a5d21f',

  // [Debug] Regen Crit Giver:
  '15ec15d3-b255-45a9-ad0b-543f72249752',

  // Bulky Package:
  '35b7a978-275b-48f0-8e3d-9be2391c6a78',

  // [ITEM TEMPLATE]:
  'a031a51e-7b07-4055-adff-a421d2ee8943',

  // [Debug] Ice Cubes:
  'acccf128-24d7-4aaf-ae4e-7dda74e30925',

  // Zordsword: 
  '34476196-7d30-4664-8fe3-e99411022a86',

  // Obsidian Shard:
  '8981892b-ce2a-43dc-a08e-2b5e8f8884fc',
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