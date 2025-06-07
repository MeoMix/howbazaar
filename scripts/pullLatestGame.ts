import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { pipeline } from 'stream/promises';
import unzipper from 'unzipper';

const GAME_URL = 'https://cdn.playthebazaar.com/bazaarprodbuild/The_Bazaar_game_64.zip';
const TIMESTAMP_FILE = './scripts/gameZipLastModified.txt';
const OUTPUT_DIR = './scripts/game';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'game.zip');

async function getStoredTimestamp(): Promise<string | null> {
    try {
        const timestamp = await fsp.readFile(TIMESTAMP_FILE, 'utf-8');
        return timestamp.trim();
    } catch {
        return null;
    }
}

async function saveTimestamp(timestamp: string): Promise<void> {
    await fsp.writeFile(TIMESTAMP_FILE, timestamp);
}

async function downloadWithProgress(url: string, destPath: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok || !response.body) {
        throw new Error(`Failed to download: ${response.statusText}`);
    }

    const totalSize = Number(response.headers.get('content-length'));
    let downloadedSize = 0;

    const fileStream = fs.createWriteStream(destPath);
    const readableStream = response.body;

    readableStream.on('data', chunk => {
        downloadedSize += chunk.length;
        const percent = ((downloadedSize / totalSize) * 100).toFixed(2);
        process.stdout.write(`\rDownloading: ${percent}%`);
    });

    await pipeline(readableStream, fileStream);
    process.stdout.write('\n');
}

async function extractZip(zipPath: string, outDir: string) {
    await fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: outDir }))
        .promise();

    console.log('Zip extraction complete.');
}

async function main() {
    try {
        const storedTimestamp = await getStoredTimestamp();

        const headResponse = await fetch(GAME_URL, { method: 'HEAD' });
        const lastModified = headResponse.headers.get('last-modified');
        if (!lastModified) throw new Error('No last-modified header found');

        if (storedTimestamp === lastModified) {
            console.log('Data is up to date');
            return;
        }

        console.log(storedTimestamp ? 'New data available, downloading...' : 'No timestamp file found, downloading...');

        // Make sure output directory exists
        await fsp.mkdir(OUTPUT_DIR, { recursive: true });

        await downloadWithProgress(GAME_URL, OUTPUT_FILE);
        await saveTimestamp(lastModified);

        console.log('Download complete and timestamp updated.');

        await extractZip(OUTPUT_FILE, OUTPUT_DIR);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

main();
