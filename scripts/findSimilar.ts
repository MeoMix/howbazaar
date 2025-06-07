import fs from 'fs';
import path from 'path';
import { imageHash } from 'image-hash';

const folder = './scripts/images/items';
const targetImage = './scripts/images/target.webp';
const threshold = 10; // Lower = more strict, higher = looser match

function hashImage(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        imageHash(filePath, 16, true, (error: any, data: any) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
}

function hammingDistance(hash1: string, hash2: string) {
    let dist = 0;
    for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] !== hash2[i]) dist++;
    }
    return dist;
}

(async () => {
    console.log(`Hashing target image: ${targetImage}`);
    const targetHash = await hashImage(targetImage);
    console.log(`Target hash: ${targetHash}`);

    const files = fs.readdirSync(folder);
    for (const file of files) {
        const filePath = path.join(folder, file);

        // Skip directories
        if (fs.statSync(filePath).isDirectory()) continue;

        try {
            const fileHash = await hashImage(filePath);
            const distance = hammingDistance(targetHash, fileHash);

            if (distance <= threshold) {
                console.log(`MATCH: ${file} (distance: ${distance})`);
            } else {
                //console.log(`NO MATCH: ${file} (distance: ${distance})`);
            }
        } catch (err) {
            console.warn(`Failed to hash ${file}: ${err}`);
        }
    }
})();
