import fs from 'fs';
import cardsJson from './v2_Cards.json';

// Filter the entries and create the mapping keyed by `id`
const getMapping = (data: any) => {
  return Object.values(data)
    .filter((entry: any) => entry.Type === "CombatEncounter")
    .reduce((acc: Record<string, any>, entry: any) => {
      acc[entry.Id] = entry.CombatantType.MonsterTemplateId;
      return acc;
    }, {});
};

// Run the filter function
const mapping = getMapping(cardsJson);

// Output the result
console.log('mapping:', mapping);

// Optional: Save to a file
fs.writeFileSync('monsterTemplateIdMapping.json', JSON.stringify(mapping, null, 2), 'utf-8');
