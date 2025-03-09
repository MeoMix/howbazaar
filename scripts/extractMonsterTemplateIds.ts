import fs from 'fs';
import cardsJson from './cards_old.json';

// This is just tech debt. As new monsters get added I need a way of handling them and I'm making it fit the old process.
const hardcodedMappings = {
  // Street Gamer
  // The values here are just manually generated GUIDs, I could probably just reuse the keys but maybe this is less confusing.
  // The keys come from the cards json
  '4101117c-9cb0-480e-bfac-814da069ec80': '8c8861cd-4309-4b36-b448-7ea6db77d2ea',
  // Yerdan
  'a44c3d18-8968-4956-b3a2-5cbf3b4c12c2': 'e12b9ee1-de04-4bdc-ad74-2485f240cfcf',

  // Kyver Commander
  '54bd46ca-2dec-4fbf-bae9-4cfff1c80043': '27afe780-4867-41d6-8126-36b501c0d2ef',
  // Scovyle
  '91c233ed-b88c-4ec9-b3ee-cec880a14213': '7a61ddf2-dd00-462c-8312-873f0d27de64',
  // Ghost Pepper
  'f79e72dc-7f9b-4e7e-b14e-d4896fcf004f': 'b146714a-748a-4862-989c-19c83f6331fb',

  // d0202706-46dc-4c65-bf87-5e4ab63632ec
};

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
const mapping = { ...getMapping(cardsJson), ...hardcodedMappings };

// Output the result
console.log('mapping:', mapping);

// Optional: Save to a file
fs.writeFileSync('src/lib/parsers/monsterTemplateIdMapping.json', JSON.stringify(mapping, null, 2), 'utf-8');
