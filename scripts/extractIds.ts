import fs from 'fs';
import cardsJson from './v2_Cards.json';

// Filter the entries
const getIdsByCriteria = (data: any) => {
  return Object.values(data)
    .filter((entry: any) => entry.Type === "Skill" && entry.SpawningEligibility === "Never")
    .map((entry: any) => entry.Id);
};

// Run the filter function
const filteredIds = getIdsByCriteria(cardsJson);

// Output the result
console.log('Filtered Ids:', filteredIds);

// Optional: Save to a file
fs.writeFileSync('filtered_ids.json', JSON.stringify(filteredIds, null, 2), 'utf-8');