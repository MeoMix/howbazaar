import fs from 'fs';
import path from 'path';
import cardsJson from './cards_old.json';

interface SkillEntry {
  id: string;
  name: string;
}

const allowedList: SkillEntry[] = [
  // Burning Shield:
  { id: '7931571a-3d32-41e8-bf7b-ca6b4d1b7a3d', name: 'Burning Shield' },
  // Machine Learning:
  { id: 'd1e825ba-653c-4993-8002-50c3933c5827', name: 'Machine Learning' },
  // Electrified Hull
  { id: '1df8d85a-9095-4ab9-952a-c668a4d5d51c', name: 'Electrified Hull' },
  // Heavy Firepower
  { id: 'e634860d-fec5-43c1-a6ca-a349450ae9c8', name: 'Heavy Firepower' },
  // Tiny Dancer
  { id: '36410add-d0de-4618-a099-ceb32a87c589', name: 'Tiny Dancer' },
  // Noisy Cricket
  { id: 'c38468ba-2636-4818-a821-6fb7e73d7110', name: 'Noisy Cricket' },
  // Invigorating Blade
  { id: '549263e2-4ab4-4fe8-a552-e94486b3e91b', name: 'Invigorating Blade' },
  // CPU Throttling
  { id: '3dd2dbac-97ee-4fc4-ac31-4d885d19e2ed', name: 'CPU Throttling' },
  // Toxic Flame
  { id: 'cbd2810c-4713-4503-a97d-30e73ccaebb7', name: 'Toxic Flame' },
  // Loaded Fury
  { id: 'a80d8cc7-3472-45cb-ac33-11fe7e583e42', name: 'Loaded Fury' },
  // Toxic Weapons
  { id: '202e4917-e744-41bf-965a-81edcded9d5f', name: 'Toxic Weapons' },
  // Double Down
  { id: '37efcae2-779d-4a60-95c6-0d663d7e0113', name: 'Double Down' },
  // Venomous Blade
  { id: 'e41f6a66-9257-45c3-b249-9f9ef0f93f3e', name: 'Venomous Blade' },
  // Toxic Shield
  { id: 'a9b441e1-5824-4855-9359-2ab4643d9ff5', name: 'Toxic Shield' },
  // Slow Burn
  { id: 'cd6ac6ef-dafb-4001-a338-52e791bec4c3', name: 'Slow Burn' },
  // Sharpshooter
  { id: '3865bde8-45b8-49d6-8945-0453c24251a9', name: 'Sharpshooter' },
  // Counterstrike
  { id: 'c5bff6ad-5d13-4cf3-9941-98f3cf913949', name: 'Counterstrike' },
  // Small Refresh
  { id: '8b513e67-9c49-4fed-a7e4-335d982367ac', name: 'Small Refresh' },
  // Healthy Heart (Hearty)
  { id: '05ec8652-3c5f-4cba-acd1-c3eee8e49d44', name: 'Healthy Heart' },
  // Streamline Weapon
  { id: '3d9279b1-dbf8-4193-8989-8d2b022533af', name: 'Streamline Weapon' },
  // Overheal Regeneration
  { id: 'ef4e5045-91c6-4973-8aed-1f29300e1db4', name: 'Overheal Regeneration' },
  // Searing Flames
  { id: '53315fc2-ef04-45fc-b269-9d4932c52621', name: 'Searing Flames' },
  // Overheal Haste
  { id: '721fa7ca-3451-4bbd-ac17-ffcff4a31ac6', name: 'Overheal Haste' },
  // Dumpster Diving
  { id: '8a9a98fe-b1bd-4da7-8233-dffd3845aa45', name: 'Dumpster Diving' },
  // Explosive Potions
  { id: 'dbd50f7c-4261-4afd-93da-2f4d9e33509e', name: 'Explosive Potions' },
  // Brewmaster
  { id: '6640af95-3999-43b2-b32d-fae5caf0b8cc', name: 'Brewmaster' },
  // Thirsty
  { id: '878440a6-99e8-4178-8d3f-38c94fb8c334', name: 'Thirsty' },
  // Stocked
  { id: 'ca3da34f-a982-4ae4-bea0-8dddac873650', name: 'Stocked' },
  // Potent Potables
  { id: 'edb9b01b-b4ce-4a77-848e-0a49b8a23c16', name: 'Potent Potables' },
  // Calming Heals
  { id: '571b3909-e04c-454f-86ae-61cc46ea3066', name: 'Calming Heals' },
];

const allowedPackIds = [
  // Not quite all enabled yet
  // 'Mak_Core'
] as string[];

const disallowedList: SkillEntry[] = [
  // Cauterize:
  { id: '7e32e9be-23d1-4d3f-a103-0a0db10bc4f4', name: 'Cauterize' },
  // Rapid Thaw:
  { id: '4589a64c-fdc8-4334-a2c7-05a3a8b2c5da', name: 'Rapid Thaw' },
  // "[DEBUG] Defense Grid"
  { id: '69edc2fa-7aba-457e-bbcf-05f2e0f18139', name: '[DEBUG] Defense Grid' },
  // Heavy Weaponry
  { id: '015bc348-773e-4009-87ff-231452431bba', name: 'Heavy Weaponry' },
  // Small Weaponry
  { id: 'c4c70f57-c51e-4bc4-848c-0f0e7fbddd28', name: 'Small Weaponry' },
  // Flanking Toxins
  { id: '8c36b532-0eb5-49f8-9128-a50b17ef3eed', name: 'Flanking Toxins' },
  // Microfiber
  { id: '883043eb-5a5f-4fa2-9cae-185f51019b11', name: 'Microfiber' },
  // Nanite Healing
  { id: 'cac848c8-dc77-4277-ba9f-df282b9f36ef', name: 'Nanite Healing' },
  // Alchemical Precision:
  { id: '8509674b-3c4b-4250-9bb4-666ef7402654', name: 'Alchemical Precision' },
  // Sparring Partner:
  { id: 'fcb51ffd-6d25-4e74-871a-7dc0de2bae91', name: 'Sparring Partner' },
  // Toxic Exposure:
  { id: 'dfeaa982-9ed6-4aee-840e-628fa8b508bd', name: 'Toxic Exposure' }
];

// Filter the entries and create a map of id -> name
const getInvalidSkillsMap = (data: any) => {
  const invalidSkills = [...disallowedList, ...Object.values(data)
    .filter((entry: any) => entry.Type === "Skill" &&
      entry.SpawningEligibility === "Never" &&
      !allowedList.map(skill => skill.id).includes(entry.Id) &&
      !allowedPackIds.includes(entry.CardPackId))
    .map((entry: any) => ({
      id: entry.Id,
      name: entry.Localization.Title.Text
    }))];

  // Create a map where each invalid ID maps to its name
  return invalidSkills.reduce((acc: Record<string, string>, skill: SkillEntry) => {
    acc[skill.id] = skill.name;
    return acc;
  }, {});
};

function writeTypeScriptMap(invalidSkillsMap: Record<string, string>) {
  const typeSafeData = JSON.stringify(invalidSkillsMap, null, 2);
  const fileContent = `// Auto-generated file. Do not edit directly.
// TypeScript representation of invalid skill IDs and their names.

const invalidSkillIds: Record<string, string> = ${typeSafeData};

export default invalidSkillIds;
`;

  const filePath = path.resolve(`./src/lib/parsers/invalidSkillIds.ts`);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Saved invalid skill IDs map to ${filePath}`);
}

// Run the filter function and write the output
const invalidSkillsMap = getInvalidSkillsMap(cardsJson);
writeTypeScriptMap(invalidSkillsMap);