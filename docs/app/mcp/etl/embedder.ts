import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import pLimit from 'p-limit';
import * as fs from 'node:fs';
import * as path from 'node:path';

const CHUNKS_FILE = path.join(import.meta.dirname, 'chunks.json');
const SEARCH_FILE = path.join(import.meta.dirname, '..', 'chunks_search.json');
const DIMENSIONS = 512;
const MAX_RETRIES = 3;

const client = new BedrockRuntimeClient({ region: 'eu-central-1' });

async function getEmbedding(text: string, attempt = 0): Promise<string> {
  try {
    const res = await client.send(
      new InvokeModelCommand({
        modelId: 'amazon.titan-embed-text-v2:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({ inputText: text, dimensions: DIMENSIONS }),
      })
    );
    // Titan v2 returns normalized unit vectors
    const embedding: number[] = JSON.parse(
      new TextDecoder().decode(res.body)
    ).embedding;
    return Buffer.from(new Float32Array(embedding).buffer).toString('base64');
  } catch (err) {
    if (attempt >= MAX_RETRIES) throw err;
    await new Promise(r => setTimeout(r, 1000 * 2 ** attempt));
    return getEmbedding(text, attempt + 1);
  }
}

interface Chunk {
  id: number;
  textForEmbedding: string;
  originalText: string;
  metadata: { file: string; heading: string };
}

const chunks: Chunk[] = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf-8'));

const concurrency = Number(process.env.CONCURRENCY ?? 5);
if (!Number.isInteger(concurrency) || concurrency < 1) {
  throw new Error('CONCURRENCY must be a positive integer');
}
const limit = pLimit(concurrency);

let done = 0,
  errors = 0;
const t0 = Date.now();

const results = (
  await Promise.all(
    chunks.map(c =>
      limit(async () => {
        try {
          const embedding = await getEmbedding(c.textForEmbedding);
          process.stdout.write(
            `\r  [${++done}/${chunks.length}]  errors: ${errors}`
          );
          return {
            id: c.id,
            originalText: c.originalText,
            metadata: c.metadata,
            embedding,
            dims: DIMENSIONS,
          };
        } catch (err) {
          errors++;
          process.stderr.write(
            `\nError [${c.id}]: ${err instanceof Error ? err.message : err}\n`
          );
          return null;
        }
      })
    )
  )
).filter((c): c is NonNullable<typeof c> => c !== null);

process.stdout.write('\n');
fs.writeFileSync(SEARCH_FILE, JSON.stringify(results));
const kb = (fs.statSync(SEARCH_FILE).size / 1024).toFixed(0);
console.log(
  `Done in ${Math.round((Date.now() - t0) / 1000)}s — ${results.length} chunks, ${errors} errors — ${SEARCH_FILE} (${kb} KB)`
);

if (errors > 0) process.exitCode = 1;
