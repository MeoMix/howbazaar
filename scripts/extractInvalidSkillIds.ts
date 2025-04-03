import fs from 'fs';
import path from 'path';
import cardsJson from './cards_old.json';

const allowedList = [
  // Corrosive Toxins:
  'b8f04ea6-ecdd-46a0-9ae6-397a090d294b',
  // Burning Shield:
  '7931571a-3d32-41e8-bf7b-ca6b4d1b7a3d',
  // Machine Learning:
  'd1e825ba-653c-4993-8002-50c3933c5827',
  // Electrified Hull
  '1df8d85a-9095-4ab9-952a-c668a4d5d51c',
  // Heavy Firepower
  'e634860d-fec5-43c1-a6ca-a349450ae9c8',
  // Tiny Dancer
  '36410add-d0de-4618-a099-ceb32a87c589',
  // Noisy Cricket
  'c38468ba-2636-4818-a821-6fb7e73d7110',
  // Invigorating Blade
  '549263e2-4ab4-4fe8-a552-e94486b3e91b',
  // CPU Throttling
  '3dd2dbac-97ee-4fc4-ac31-4d885d19e2ed',
  // Toxic Flame
  'cbd2810c-4713-4503-a97d-30e73ccaebb7',
  // Loaded Fury
  'a80d8cc7-3472-45cb-ac33-11fe7e583e42',
  // Toxic Weapons
  '202e4917-e744-41bf-965a-81edcded9d5f',
  // Double Down
  '37efcae2-779d-4a60-95c6-0d663d7e0113',
  // Venomous Blade
  'e41f6a66-9257-45c3-b249-9f9ef0f93f3e',
  // Toxic Shield
  'a9b441e1-5824-4855-9359-2ab4643d9ff5',
  // Slow Burn
  'cd6ac6ef-dafb-4001-a338-52e791bec4c3',
  // Sharpshooter
  '3865bde8-45b8-49d6-8945-0453c24251a9',
  // Counterstrike
  'c5bff6ad-5d13-4cf3-9941-98f3cf913949',
  // Small Refresh
  '8b513e67-9c49-4fed-a7e4-335d982367ac',
  // Healthy Heart (Hearty)
  '05ec8652-3c5f-4cba-acd1-c3eee8e49d44',
  // Overheal Haste
  '721fa7ca-3451-4bbd-ac17-ffcff4a31ac6',
  // Dumpster Diving
  '8a9a98fe-b1bd-4da7-8233-dffd3845aa45',
  // Explosive Potions
  'dbd50f7c-4261-4afd-93da-2f4d9e33509e',
  // Brewmaster
  '6640af95-3999-43b2-b32d-fae5caf0b8cc',
  // Thirsty
  '878440a6-99e8-4178-8d3f-38c94fb8c334',
  // Stocked
  'ca3da34f-a982-4ae4-bea0-8dddac873650',
  // Potent Potables
  'edb9b01b-b4ce-4a77-848e-0a49b8a23c16',
  // Heavy Drinker
  // 'af42d725-dc55-4f6f-9de6-b7a4c7f7013e',

  // TODO: Not enabled yet.
  // "e78b1599-ca80-47b0-b386-04ae403994d5", Virulent Research
  // "8089e76c-1565-457b-9cd5-fc38f60bd185", Immunocompromised
];

const allowedPackIds = [
  // Note quite all enabled yet
 // 'Mak_Core'
] as string[];

const disallowedList = [
  // Cauterize:
  "7e32e9be-23d1-4d3f-a103-0a0db10bc4f4",
  // Rapid Thaw:
  "4589a64c-fdc8-4334-a2c7-05a3a8b2c5da",
  // Stout Fire:
  // "d08bdeb9-ef08-48be-9df7-0edd9fcff6cf"
  // "[DEBUG] Defense Grid"
  "69edc2fa-7aba-457e-bbcf-05f2e0f18139",
  // Heavy Weaponry
  "015bc348-773e-4009-87ff-231452431bba",
  // Small Weaponry
  "c4c70f57-c51e-4bc4-848c-0f0e7fbddd28",
  // Microfiber
  "883043eb-5a5f-4fa2-9cae-185f51019b11",
  // Nanite Healing
  "cac848c8-dc77-4277-ba9f-df282b9f36ef",

  // Alchemical Precision:
  "8509674b-3c4b-4250-9bb4-666ef7402654",
  // Crimson Dash:
  "42a673e6-f6cd-45ea-89e2-d37614271016",
  // Essence Overflow:
  "db94a1da-532e-42e1-af25-5033b0fc8bcb",
  // Sparring Partner:
  "fcb51ffd-6d25-4e74-871a-7dc0de2bae91"
];

// Filter the entries
const getIdsByCriteria = (data: any) => {
  return [...disallowedList, ...Object.values(data)
    .filter((entry: any) => entry.Type === "Skill" &&
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
const filePath = path.resolve(`./src/lib/parsers/invalidSkillIds.json`);
fs.writeFileSync(filePath, JSON.stringify(filteredIds, null, 2), 'utf-8');