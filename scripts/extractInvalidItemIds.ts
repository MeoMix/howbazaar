import fs from 'fs';
import path from 'path';
import cardsJson from './cards_old.json';

interface ItemEntry {
  id: string;
  name: string;
}

const allowedList: ItemEntry[] = [
  // Extract names from comments
  { id: 'aaa7d8fc-dd1b-42b3-9ea0-3b982f2f3790', name: 'Arc Blaster' },
  { id: 'b9d4df16-0876-45ee-a35e-700d7b68cb6f', name: 'Fuel Rod' },
  { id: '8eb91c44-0e07-4e89-8cad-dfe99b8ef443', name: 'Red Button' },
  { id: '2aab9e1b-8c8d-49d0-be45-5884731ebb08', name: 'Truffles' },
  { id: '855cf2a5-930b-43db-b388-9f814f80a4fb', name: 'Piggy Bank' },
  { id: 'f0a58209-1a26-42ac-a243-7c2fd9d6ce33', name: 'Black Ice' },
  { id: 'af43730d-efaa-4a1d-adeb-bf31d536acf0', name: 'Boomerang' },
  { id: '292115b4-a145-476e-b3a7-0fe199b5c1af', name: 'Dragon Wing' },
  { id: '5a94a820-1b13-4164-bae9-f6abbd59eb2d', name: "Dragon's Breath" },
  { id: 'f1c04562-6db4-45d5-a056-a4df9d185faf', name: 'Salt' },
  { id: 'c0455f22-2fb9-4ce6-a65f-e874e3d86ff0', name: 'Hot Sauce' },
  { id: '0d227497-f57f-44ef-98a8-15791e710fb6', name: 'Skillet' },
  { id: '2f4625b6-42e1-42e8-9f50-82edf038fac1', name: 'Dragon Heart' },
  { id: '723880db-8a97-4833-a9a1-80c75cde4c17', name: '3D Printer' },
];

const allowedPackIds = [
  'Vanessa_Core',
  'Vanessa_Mysteries_of_the_Deep',
  'Pygmalien_Core',
  'Pyg_Frozen_Assets',
  'Mak_Core'
];

const disallowedList: ItemEntry[] = [
  { id: 'bfa28eec-84de-41cb-bc5c-8de700a5d21f', name: 'Focused Core' },
  { id: '35b7a978-275b-48f0-8e3d-9be2391c6a78', name: 'Bulky Package' },
  { id: '8b2ce029-7f69-401c-9811-3a6398237a90', name: 'Gingerbread Man' },
];

// Filter the entries and create a map of id -> name
const getInvalidItemsMap = (data: any) => {
  const invalidIds = [...disallowedList, ...Object.values(data)
    .filter((entry: any) => entry.Type === "Item" &&
      entry.SpawningEligibility === "Never" &&
      !allowedList.map(item => item.id).includes(entry.Id) &&
      !allowedPackIds.includes(entry.CardPackId))
    .map((entry: any) => ({
      id: entry.Id,
      name: entry.Localization.Title.Text
    }))];

  // Create a map where each invalid ID maps to its name
  return invalidIds.reduce((acc: Record<string, string>, item: ItemEntry) => {
    acc[item.id] = item.name;
    return acc;
  }, {});
};

function writeTypeScriptMap(invalidItemsMap: Record<string, string>) {
  const typeSafeData = JSON.stringify(invalidItemsMap, null, 2);
  const fileContent = `// Auto-generated file. Do not edit directly.
// TypeScript representation of invalid item IDs and their names.

const invalidItemIds: Record<string, string> = ${typeSafeData};

export default invalidItemIds;
`;

  const filePath = path.resolve(`./src/lib/parsers/invalidItemIds.ts`);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Saved invalid item IDs map to ${filePath}`);
}

// Run the filter function and write the output
const invalidItemsMap = getInvalidItemsMap(cardsJson);
writeTypeScriptMap(invalidItemsMap);