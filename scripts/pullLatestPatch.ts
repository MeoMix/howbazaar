import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

const CARDS_URL = 'https://cdn.playthebazaar.com/bazaardesigndataprod/cards.json';
const TIMESTAMP_FILE = './scripts/cardsJsonLastModified.txt';
const OUTPUT_DIR = './src/lib/parsers/data';

async function getStoredTimestamp(): Promise<string | null> {
    try {
        const timestamp = await fs.readFile(TIMESTAMP_FILE, 'utf-8');
        return timestamp.trim();
    } catch {
        return null;
    }
}

async function saveTimestamp(timestamp: string): Promise<void> {
    await fs.writeFile(TIMESTAMP_FILE, timestamp);
}

async function main() {
    try {
        // Get the stored timestamp
        const storedTimestamp = await getStoredTimestamp();

        // Make HEAD request to check last-modified
        const headResponse = await fetch(CARDS_URL, { method: 'HEAD' });
        const lastModified = headResponse.headers.get('last-modified');

        if (!lastModified) {
            throw new Error('No last-modified header found in response');
        }

        // If timestamps match and we have a stored timestamp, no need to download
        if (storedTimestamp && storedTimestamp === lastModified) {
            console.log('Data is up to date');
            return;
        }

        // Download new data
        console.log(storedTimestamp ? 'New data available, downloading...' : 'No timestamp file found, downloading...');
        const response = await fetch(CARDS_URL);
        const data = await response.json();

        // Write the new data
        await fs.writeFile(
            path.join(OUTPUT_DIR, 'cards.json'),
            JSON.stringify(data, null, 2)
        );

        // Update stored timestamp
        await saveTimestamp(lastModified);

        console.log('Successfully updated game data');
    } catch (error) {
        console.error('Error updating game data:', error);
        process.exit(1);
    }
}

main();
