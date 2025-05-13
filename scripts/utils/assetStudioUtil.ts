import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fsp from 'fs/promises';

const execFileAsync = promisify(execFile);
const executable = 'AssetStudioModCLI';
const INPUT_PATH = './scripts/game/TheBazaar_Data/StreamingAssets/aa/StandaloneWindows64';

interface AssetStudioOptions {
    outputPath: string;
    filterByName: string;
    type: 'tex2d' | 'monoBehaviour';
    imageFormat?: 'jpg' | 'png';
}

export async function extractAssets({
    outputPath,
    filterByName,
    type,
    imageFormat,
}: AssetStudioOptions): Promise<void> {
    await fsp.rm(outputPath, { recursive: true, force: true });

    const args = [
        path.resolve(INPUT_PATH),
        '--filter-by-name', filterByName,
        '-g', 'none',
        '-t', type,
        '-o', path.resolve(outputPath),
    ];

    if (type === 'tex2d' && imageFormat) {
        args.push('--image-format', imageFormat);
    }

    try {
        console.log(`Extracting: filter=${filterByName}, type=${type}`);
        const { stdout, stderr } = await execFileAsync(executable, args);
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        console.log(`Extraction done for output: ${outputPath}`);
    } catch (err: any) {
        console.error('AssetStudioModCLI failed:', err.message || err);
        throw err;
    }
}