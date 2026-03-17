/**
 * MCP Server — Marigold Design System
 *
 * Serves design system documentation via semantic search.
 * Loads pre-embedded chunks at cold start, embeds the incoming query
 * via Bedrock Titan v2, and returns the top-K most relevant sections.
 *
 * POST /mcp { query: string, limit?: number }
 */
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { type NextRequest, NextResponse } from 'next/server';

// ─── Config ──────────────────────────────────────────────────────────────────

const TITAN_MODEL_ID = 'amazon.titan-embed-text-v2:0';
const TITAN_DIMENSIONS = 512;
const AWS_REGION = process.env.AWS_REGION ?? 'eu-central-1';
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 20;
const MAX_QUERY_LENGTH = 1000;

// Rate limiting: requests per IP per window
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

// ─── Types ───────────────────────────────────────────────────────────────────

interface StoredChunk {
  id: number;
  textForEmbedding: string;
  originalText: string;
  metadata: { file: string; category: string; heading: string };
  embedding: number[];
  dims: number;
}

interface SearchResult {
  score: number;
  text: string;
  metadata: StoredChunk['metadata'];
}

// ─── Bedrock client (singleton) ──────────────────────────────────────────────

const bedrock = new BedrockRuntimeClient({ region: AWS_REGION });

async function embedQuery(text: string): Promise<Float32Array> {
  const res = await bedrock.send(
    new InvokeModelCommand({
      modelId: TITAN_MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        inputText: text,
        dimensions: TITAN_DIMENSIONS,
      }),
    })
  );

  const body = JSON.parse(new TextDecoder().decode(res.body));
  const raw: number[] = body.embedding;

  // Normalize to unit vector so dot product = cosine similarity
  const magnitude = Math.sqrt(raw.reduce((s, v) => s + v * v, 0));
  return new Float32Array(raw.map(v => v / magnitude));
}

// ─── Vector store (lazy singleton, survives warm starts) ─────────────────────

interface VectorStore {
  chunks: StoredChunk[];
  vectors: Float32Array[];
}

let store: VectorStore | null = null;

async function getStore(): Promise<VectorStore> {
  if (store) return store;

  const data: StoredChunk[] = (
    await import('./etl/chunks_embedded.json', { with: { type: 'json' } })
  ).default as StoredChunk[];

  const vectors = data.map(chunk => new Float32Array(chunk.embedding));

  store = { chunks: data, vectors };
  return store;
}

// ─── Search ──────────────────────────────────────────────────────────────────

function search(
  queryVec: Float32Array,
  { chunks, vectors }: VectorStore,
  limit: number
): SearchResult[] {
  const scores: { idx: number; score: number }[] = [];

  for (let i = 0; i < vectors.length; i++) {
    const vec = vectors[i];
    let dot = 0;
    for (let d = 0; d < queryVec.length; d++) {
      dot += queryVec[d] * vec[d];
    }
    scores.push({ idx: i, score: dot });
  }

  scores.sort((a, b) => b.score - a.score);

  return scores.slice(0, limit).map(({ idx, score }) => ({
    score: Math.round(score * 10000) / 10000,
    text: chunks[idx].originalText,
    metadata: chunks[idx].metadata,
  }));
}

// ─── Rate limiter (in-memory, per instance) ──────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again later.' },
      { status: 429 }
    );
  }

  let body: { query?: unknown; limit?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { query, limit: rawLimit } = body;

  if (typeof query !== 'string' || query.trim().length === 0) {
    return NextResponse.json(
      { error: 'Missing or empty "query" field.' },
      { status: 400 }
    );
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { error: `Query exceeds max length of ${MAX_QUERY_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const limit = Math.min(
    Math.max(1, typeof rawLimit === 'number' ? rawLimit : DEFAULT_LIMIT),
    MAX_LIMIT
  );

  try {
    const [queryVec, vectorStore] = await Promise.all([
      embedQuery(query.trim()),
      getStore(),
    ]);

    const results = search(queryVec, vectorStore, limit);

    return NextResponse.json({
      results,
      meta: {
        query: query.trim(),
        limit,
        totalChunks: vectorStore.chunks.length,
      },
    });
  } catch (err) {
    console.error('[MCP] Search error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
