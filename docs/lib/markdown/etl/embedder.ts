import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { put } from '@vercel/blob';
import pLimit from 'p-limit';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CHUNKS_FILE = path.join(__dirname, 'chunks.json');
const DIMENSIONS = 512;
const MAX_RETRIES = 3;
const TPM_LIMIT = 280000; // buffer since Titan Text Embeddings V2 allows only 300k tokens per minute

/** Sliding-window token rate limiter — prevents hitting the quota */
class TokenRateLimiter {
  private window: { ts: number; tokens: number }[] = [];

  async acquire(text: string): Promise<void> {
    // Titan tokenizes ~1 token per 3.5 chars
    const tokens = Math.ceil(text.length / 3.5);
    if (tokens > TPM_LIMIT) {
      throw new Error(
        `Single chunk requires ${tokens} tokens, exceeding TPM_LIMIT of ${TPM_LIMIT}.`
      );
    }
    for (;;) {
      const now = Date.now();
      this.window = this.window.filter(e => now - e.ts < 60_000);
      const used = this.window.reduce((sum, e) => sum + e.tokens, 0);
      if (used + tokens <= TPM_LIMIT) {
        this.window.push({ ts: now, tokens });
        return;
      }
      // wait until the oldest entry leaves the 60s window
      const waitMs = 60_000 - (now - this.window[0].ts) + 50;
      await new Promise(r => setTimeout(r, waitMs));
    }
  }
}

const rateLimiter = new TokenRateLimiter();

const AWS_BEDROCK_ACCESS_KEY_ID = process.env.AWS_BEDROCK_ACCESS_KEY_ID;
const AWS_BEDROCK_SECRET_ACCESS_KEY = process.env.AWS_BEDROCK_SECRET_ACCESS_KEY;

if (!AWS_BEDROCK_ACCESS_KEY_ID || !AWS_BEDROCK_SECRET_ACCESS_KEY) {
  throw new Error(
    'Missing AWS credentials. Set AWS_BEDROCK_ACCESS_KEY_ID and AWS_BEDROCK_SECRET_ACCESS_KEY environment variables.'
  );
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error(
    'Missing BLOB_READ_WRITE_TOKEN. Embeddings can only be published to Vercel Blob.'
  );
}

const client = new BedrockRuntimeClient({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: AWS_BEDROCK_ACCESS_KEY_ID,
    secretAccessKey: AWS_BEDROCK_SECRET_ACCESS_KEY,
  },
});

async function getEmbedding(text: string, attempt = 0): Promise<string> {
  await rateLimiter.acquire(text);
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

type Chunk = {
  id: number;
  textForEmbedding: string;
  originalText: string;
  metadata: { file: string; heading: string };
};

const chunks: Chunk[] = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf-8'));

const concurrency = Number(process.env.CONCURRENCY ?? 5);
if (!Number.isInteger(concurrency) || concurrency < 1) {
  throw new Error('CONCURRENCY must be a positive integer');
}
const limit = pLimit(concurrency);

async function main() {
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
  const json = JSON.stringify(results);
  const kb = (Buffer.byteLength(json) / 1024).toFixed(0);

  console.log('Uploading embeddings to Vercel Blob...');
  const blob = await put('embeddings.json', json, {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  console.log(
    `Done in ${Math.round((Date.now() - t0) / 1000)}s — ${results.length} chunks, ${errors} errors, ${kb} KB → ${blob.url}`
  );

  if (errors > 0) process.exitCode = 1;
}

main();
