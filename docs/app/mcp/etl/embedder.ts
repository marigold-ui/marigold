/**
 * Embedder: Generates vector embeddings for chunks.
 *
 * Reads chunks.json, embeds each chunk's textForEmbedding, and writes
 * chunks_embedded.json with normalized unit vectors in Base64 Float32 format.
 *
 * Providers:
 *   - ollama  (default) – local Ollama with nomic-embed-text
 *   - bedrock           – AWS Bedrock with Titan Embed Text v2 (512 dims)
 *
 * Usage:
 *   node --experimental-strip-types docs/app/mcp/etl/embedder.ts
 *   PROVIDER=bedrock node --experimental-strip-types docs/app/mcp/etl/embedder.ts
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Config ──────────────────────────────────────────────────────────────────

const ETL_DIR = import.meta.dirname;
const CHUNKS_FILE = path.join(ETL_DIR, 'chunks.json');
const OUTPUT_FILE = path.join(ETL_DIR, 'chunks_embedded.json');

const PROVIDER = (process.env.PROVIDER ?? 'ollama') as 'ollama' | 'bedrock';
const CONCURRENCY = parseInt(process.env.CONCURRENCY ?? '2', 10);
const CHECKPOINT_EVERY = 50;
const LOG_EVERY = 10;
const TITAN_DIMENSIONS = 512;

// ─── Types ───────────────────────────────────────────────────────────────────

interface InputChunk {
  id: number;
  textForEmbedding: string;
  originalText: string;
  metadata: { file: string; category: string; heading: string };
}

interface EmbeddedChunk {
  id: number;
  textForEmbedding: string;
  originalText: string;
  metadata: { file: string; category: string; heading: string };
  /** Unit-normalized embedding vector */
  embedding: number[];
  dims: number;
}

type EmbedFn = (text: string) => Promise<number[]>;

// ─── Vector utils ────────────────────────────────────────────────────────────

function normalize(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  if (magnitude === 0) return vector;
  return vector.map(v => v / magnitude);
}

// ─── Embedding providers ─────────────────────────────────────────────────────

async function createOllamaProvider(): Promise<EmbedFn> {
  const { Ollama } = await import('ollama');
  const host = process.env.OLLAMA_HOST ?? 'http://localhost:11434';
  const model = 'nomic-embed-text';
  const client = new Ollama({ host });

  console.log(`Provider: Ollama (${host}, model: ${model})`);

  return async (text: string) => {
    const res = await client.embed({ model, input: text });
    return res.embeddings[0];
  };
}

async function createBedrockProvider(): Promise<EmbedFn> {
  const { BedrockRuntimeClient, InvokeModelCommand } =
    await import('@aws-sdk/client-bedrock-runtime');
  const region = process.env.AWS_REGION ?? 'eu-central-1';
  const modelId = 'amazon.titan-embed-text-v2:0';
  const client = new BedrockRuntimeClient({ region });

  console.log(
    `Provider: Bedrock (${region}, model: ${modelId}, dims: ${TITAN_DIMENSIONS})`
  );

  return async (text: string) => {
    const res = await client.send(
      new InvokeModelCommand({
        modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          inputText: text,
          dimensions: TITAN_DIMENSIONS,
        }),
      })
    );
    const body = JSON.parse(new TextDecoder().decode(res.body));
    return body.embedding as number[];
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDuration(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function loadExisting(): Map<number, EmbeddedChunk> {
  const map = new Map<number, EmbeddedChunk>();
  if (!fs.existsSync(OUTPUT_FILE)) return map;
  try {
    const data: EmbeddedChunk[] = JSON.parse(
      fs.readFileSync(OUTPUT_FILE, 'utf-8')
    );
    for (const c of data) map.set(c.id, c);
    console.log(`Resuming: ${map.size} already-embedded chunks found.`);
  } catch {
    console.warn('Could not parse existing output — starting fresh.');
  }
  return map;
}

function saveCheckpoint(embedded: Map<number, EmbeddedChunk>) {
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(Array.from(embedded.values()), null, 2)
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(CHUNKS_FILE)) {
    console.error(`chunks.json not found. Run the chunker first.`);
    process.exit(1);
  }

  const allChunks: InputChunk[] = JSON.parse(
    fs.readFileSync(CHUNKS_FILE, 'utf-8')
  );
  console.log(`Loaded ${allChunks.length} chunks from chunks.json`);

  const embedded = loadExisting();

  const todo = allChunks
    .filter(c => !embedded.has(c.id))
    .sort((a, b) => a.textForEmbedding.length - b.textForEmbedding.length);

  if (todo.length === 0) {
    console.log('All chunks already embedded. Nothing to do.');
    return;
  }

  const embed =
    PROVIDER === 'bedrock'
      ? await createBedrockProvider()
      : await createOllamaProvider();

  const pLimit = (await import('p-limit')).default;
  const limit = pLimit(CONCURRENCY);

  console.log(
    `\nTo embed: ${todo.length} chunks (concurrency=${CONCURRENCY})\n`
  );

  let done = 0;
  let errors = 0;
  const startTime = Date.now();
  let lastCheckpoint = 0;

  const tasks = todo.map(chunk =>
    limit(async () => {
      try {
        const raw = await embed(chunk.textForEmbedding);
        const normalized = normalize(raw);

        embedded.set(chunk.id, {
          ...chunk,
          embedding: normalized,
          dims: raw.length,
        });
      } catch (err) {
        errors++;
        const msg = err instanceof Error ? err.message : String(err);
        process.stderr.write(`\nError embedding ${chunk.id}: ${msg}\n`);
      }

      done++;

      if (done % LOG_EVERY === 0 || done === todo.length) {
        const elapsed = Date.now() - startTime;
        const rate = done / (elapsed / 1000);
        const eta =
          rate > 0 ? formatDuration(((todo.length - done) / rate) * 1000) : '—';
        process.stdout.write(
          `\r  [${done}/${todo.length}]  elapsed: ${formatDuration(elapsed)}  ETA: ${eta}  errors: ${errors}   `
        );
      }

      if (done - lastCheckpoint >= CHECKPOINT_EVERY) {
        saveCheckpoint(embedded);
        lastCheckpoint = done;
      }
    })
  );

  await Promise.all(tasks);
  process.stdout.write('\n');

  saveCheckpoint(embedded);

  const elapsed = Date.now() - startTime;
  const fileSizeMb = (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2);
  const firstChunk = Array.from(embedded.values()).find(c => c.embedding);

  console.log(`\nDone in ${formatDuration(elapsed)}`);
  console.log(`  Embedded:  ${done - errors}`);
  console.log(`  Total:     ${embedded.size}`);
  console.log(`  Errors:    ${errors}`);
  console.log(`  Dims:      ${firstChunk?.dims ?? '?'}`);
  console.log(`  File:      ${OUTPUT_FILE} (${fileSizeMb} MB)`);
}

main().catch(err => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
