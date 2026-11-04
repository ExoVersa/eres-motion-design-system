import 'dotenv/config';
import {writeFile} from 'node:fs/promises';
import {pexelsProvider, unsplashProvider} from '../providers/index';

const args = process.argv.slice(2);

const providerName =
  args.find((arg) => arg.startsWith('--provider='))?.split('=')[1] ??
  'pexels';

const mediaType =
  args.find((arg) => arg.startsWith('--type='))?.split('=')[1] ?? 'image';

const limit = Number(
  args.find((arg) => arg.startsWith('--limit='))?.split('=')[1] ?? 10,
);

const query = args
  .filter((arg) => !arg.startsWith('--'))
  .join(' ')
  .trim();

if (!query) {
  throw new Error(
    'Usage: npm run assets:search -- "équipe en réunion" --provider=pexels --type=video',
  );
}

if (providerName !== 'pexels' && providerName !== 'unsplash') {
  throw new Error('Provider supported: pexels or unsplash');
}

if (mediaType !== 'image' && mediaType !== 'video') {
  throw new Error('Type supported: image or video');
}

if (providerName === 'unsplash' && mediaType === 'video') {
  throw new Error('Unsplash supports images only');
}

const provider =
  providerName === 'pexels' ? pexelsProvider : unsplashProvider;

const results = await provider.search({
  query,
  mediaType,
  limit,
  orientation: 'landscape',
});

const safeName = query
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const outputPath = `pipeline/assets/search-${providerName}-${safeName}.json`;

await writeFile(
  outputPath,
  JSON.stringify(
    {
      query,
      provider: providerName,
      mediaType,
      results,
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`Found ${results.length} assets`);
console.log(`Saved to ${outputPath}`);

for (const result of results) {
  console.log(
    [
      result.asset.id,
      result.asset.author,
      result.asset.license,
      result.previewUrl,
    ].join(' | '),
  );
}
