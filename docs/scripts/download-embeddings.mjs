import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '..', 'embeddings.json');

const url = process.env.BLOB_READ_WRITE_TOKEN;

if (!url) {
  console.error(
    'BLOB_READ_WRITE_TOKEN is not set. Cannot download embeddings.'
  );
  process.exit(1);
}

console.log('Downloading embeddings.json from Vercel Blob...');

const response = await fetch(url);

if (!response.ok) {
  console.error(
    `Failed to download embeddings: ${response.status} ${response.statusText}`
  );
  process.exit(1);
}

const data = await response.text();
writeFileSync(outputPath, data);

console.log('embeddings.json downloaded successfully.');
