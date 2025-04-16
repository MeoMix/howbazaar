import fs from 'fs';
import cardsJson from './cards_old.json';

interface MonsterTemplate {
  monsterTemplateId: string;
  name: string;
}

// This is just tech debt. As new monsters get added I need a way of handling them and I'm making it fit the old process.
// The values here are just manually generated GUIDs, I could probably just reuse the keys but maybe this is less confusing.
// The keys come from the cards json
const hardcodedMappings: Record<string, MonsterTemplate> = {
  // Street Gamer
  '4101117c-9cb0-480e-bfac-814da069ec80': {
    monsterTemplateId: '8c8861cd-4309-4b36-b448-7ea6db77d2ea',
    name: 'Street Gamer'
  },
  // Yerdan
  'a44c3d18-8968-4956-b3a2-5cbf3b4c12c2': {
    monsterTemplateId: 'e12b9ee1-de04-4bdc-ad74-2485f240cfcf',
    name: 'Yerdan'
  },
  // Kyver Commander
  '54bd46ca-2dec-4fbf-bae9-4cfff1c80043': {
    monsterTemplateId: '27afe780-4867-41d6-8126-36b501c0d2ef',
    name: 'Kyver Commander'
  },
  // Scovyle
  '91c233ed-b88c-4ec9-b3ee-cec880a14213': {
    monsterTemplateId: '7a61ddf2-dd00-462c-8312-873f0d27de64',
    name: 'Scovyle'
  },
  // Ghost Pepper
  'f79e72dc-7f9b-4e7e-b14e-d4896fcf004f': {
    monsterTemplateId: 'b146714a-748a-4862-989c-19c83f6331fb',
    name: 'Ghost Pepper'
  },
};

// Filter the entries and create the mapping keyed by `id`
const getMapping = (data: any) => {
  return Object.values(data)
    .filter((entry: any) => entry.Type === "CombatEncounter")
    .reduce((acc: Record<string, MonsterTemplate>, entry: any) => {
      acc[entry.Id] = {
        monsterTemplateId: entry.CombatantType.MonsterTemplateId,
        name: entry.Localization.Title.Text
      };
      return acc;
    }, {});
};

function writeTypeScriptMap(monsterMapping: Record<string, MonsterTemplate>) {
  const typeSafeData = JSON.stringify(monsterMapping, null, 2);
  const fileContent = `// Auto-generated file. Do not edit directly.
// TypeScript representation of monster template IDs and their details.

interface MonsterTemplate {
  monsterTemplateId: string;
  name: string;
}

const monsterTemplateMapping: Record<string, MonsterTemplate> = ${typeSafeData};

export default monsterTemplateMapping;
`;

  const filePath = 'src/lib/parsers/monsterTemplateIdMapping.ts';
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Saved monster template mapping to ${filePath}`);
}

// Run the filter function
const mapping = { ...getMapping(cardsJson), ...hardcodedMappings };

// Output the result
console.log('mapping:', mapping);

// Save the TypeScript file
writeTypeScriptMap(mapping);
