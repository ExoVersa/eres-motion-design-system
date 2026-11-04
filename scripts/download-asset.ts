import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {basename, extname} from 'node:path';

const args = process.argv.slice(2);

const searchFile = args.find((arg) => !arg.startsWith('--'));

const index = Number(
  args.find((arg) => arg.startsWith('--index='))?.split('=')[1] ?? 0,
);

if (!searchFile) {
  throw new Error(
    'Usage: npm run assets:download -- pipeline/assets/search-pexels-equipe-en-reunion.json --index=0',
  );
}

const searchData = JSON.parse(await readFile(searchFile, 'utf8'));
const result = searchData.results?.[index];

if (!result) {
  throw new Error(`No asset found at index ${index}`);
}

const downloadUrl = result.downloadUrl ?? result.previewUrl;

if (!downloadUrl) {
  throw new Error('Selected asset has no download URL');
}

const response = await fetch(downloadUrl);

if (!response.ok) {
  throw new Error(
    `Download failed: ${response.status} ${response.statusText}`,
  );
}

const contentType = response.headers.get('content-type') ?? '';
const extensionFromUrl = extname(new URL(downloadUrl).pathname);

let extension = extensionFromUrl;

if (!extension) {
  if (contentType.includes('video')) {
    extension = '.mp4';
  } else if (contentType.includes('png')) {
    extension = '.png';
  } else {
    extension = '.jpg';
  }
}

const safeName = basename(result.asset.id)
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '-');

const outputDirectory = 'public/stock';
const outputPath = `${outputDirectory}/${safeName}${extension}`;

await mkdir(outputDirectory, {recursive: true});
await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));

const manifestPath = 'pipeline/assets/manifest.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

manifest.assets ??= [];

const assetRecord = {
  ...result.asset,
  localPath: outputPath,
  metadata: {
    ...(result.asset.metadata ?? {}),
    downloadedAt: new Date().toISOString(),
    sourceSearchFile: searchFile,
  },
};

const existingIndex = manifest.assets.findIndex(
  (asset: {id: string}) => asset.id === assetRecord.id,
);

if (existingIndex >= 0) {
  manifest.assets[existingIndex] = assetRecord;
} else {
  manifest.assets.push(assetRecord);
}

await writeFile(
  manifestPath,
  JSON.stringify(manifest, null, 2),
  'utf8',
);

console.log(`Downloaded: ${outputPath}`);
console.log(`Updated: ${manifestPath}`);
