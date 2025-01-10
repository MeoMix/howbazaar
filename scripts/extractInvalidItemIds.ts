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
];

const disallowedList = [
  // Loupe Debug:
  '0fa524e3-c2a4-4509-b91a-6b9d60da5e07',
];

const validCardPacks = ['Dooley_Core', 'Pygmalien_Core', 'Vanessa_Core'];

const getByCriteria = (data: any) => {
  return [...disallowedList, ...Object.values(data)
    .filter((entry: any) => entry.Type === "Item" && entry.SpawningEligibility === "Never" && !allowedList.includes(entry.Id) && validCardPacks.includes(entry.CardPackId))
    .map((entry: any) => entry.Id)];
};

console.log('how many?', getByCriteria(cardsJson).length);


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