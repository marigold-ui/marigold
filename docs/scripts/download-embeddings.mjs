import { get } from '@vercel/blob';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(
  __dirname,
  '..',
  'lib',
  'markdown',
  'embeddings.json'
);

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error(
    'BLOB_READ_WRITE_TOKEN is not set. Cannot download embeddings.'
  );
  process.exit(1);
}

try {
  const result = await get('embeddings.json', {
    access: 'private',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  if (result?.statusCode !== 200) {
    throw new Error(
      `Download failed. Status: ${result?.statusCode ?? 'not found'}`
    );
  }

  const buffer = Buffer.from(await new Response(result.stream).arrayBuffer());
  await writeFile(outputPath, buffer);

  console.log(`embeddings.json successfully saved to: ${outputPath}`);
} catch (err) {
  console.error('Failed to download embeddings:', err);
  process.exit(1);
}
