import fs from 'fs';
import path from 'path';
import cardsJson from './v2_Cards.json';

const allowedList = [
  // Arc Blaster:
  'aaa7d8fc-dd1b-42b3-9ea0-3b982f2f3790'
];

// Filter the entries
const getIdsByCriteria = (data: any) => {
  return Object.values(data)
    .filter((entry: any) => entry.Type === "Item" && entry.SpawningEligibility === "Never" && !allowedList.includes(entry.Id))
    .map((entry: any) => entry.Id);
};

// Run the filter function
const filteredIds = getIdsByCriteria(cardsJson);

// Output the result
console.log('Filtered Ids:', filteredIds);

// Optional: Save to a file
const filePath = path.resolve(`./src/lib/parsers/invalidItemIds.json`);
fs.writeFileSync(filePath, JSON.stringify(filteredIds, null, 2), 'utf-8');