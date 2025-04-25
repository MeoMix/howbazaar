import data from '$lib/db/patches/latest/parsedMerchantCards';
import fs from 'fs';
import path from 'path';

// Create the mapping object
const merchantFilterMapping: { [key: string]: { name: string, heroes: string[] } } = {};

// Populate the mapping from the parsed merchant cards
data.forEach(merchant => {
    merchantFilterMapping[merchant.id] = { 
        name: merchant.name,
        heroes: merchant.heroes
    };
});

// Convert to string format with custom formatting
const entries = Object.entries(merchantFilterMapping)
    .sort(([, a], [, b]) => a.name.localeCompare(b.name))
    .map(([key, value]) => `    "${key}": { "name": "${value.name}", "heroes": ${JSON.stringify(value.heroes)} }`)
    .join(',\n');

const outputContent = `export const merchantFilterMapping: { [key: string]: { name: string, heroes: string[] } } = {
${entries}
};
`;

// Write to file
const filePath = path.resolve(`./scripts/parsers/merchantFilterMapping.ts`);
fs.writeFileSync(filePath, outputContent);

console.log('Generated merchantFilterMapping.ts successfully!');