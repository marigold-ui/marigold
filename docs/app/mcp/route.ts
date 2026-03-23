/**
 * MCP Server — Marigold Design System
 *
 * Exposes design system documentation as MCP tools that coding agents
 * (Cursor, Windsurf, Claude Code, etc.) can discover and use automatically.
 *
 * Transport: Streamable HTTP at /mcp
 */
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';

// ─── Config ──────────────────────────────────────────────────────────────────

const TITAN_MODEL_ID = 'amazon.titan-embed-text-v2:0';
const TITAN_DIMENSIONS = 512;
const AWS_REGION = process.env.AWS_REGION ?? 'eu-central-1';

// ─── Types ───────────────────────────────────────────────────────────────────

interface StoredChunk {
  id: number;
  originalText: string;
  metadata: { file: string; heading: string };
  embedding: string;
  dims: number;
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
  return new Float32Array(body.embedding);
}

// ─── Vector store (lazy singleton, survives warm starts) ─────────────────────

interface VectorStore {
  chunks: StoredChunk[];
  vectors: Float32Array[];
}

let store: VectorStore | null = null;

function getStore(): VectorStore {
  if (store) return store;

  const raw = fs.readFileSync(
    path.join(import.meta.dirname, 'chunks_search.json'),
    'utf-8'
  );
  const data: StoredChunk[] = JSON.parse(raw);

  const vectors = data.map(chunk => {
    const buf = Buffer.from(chunk.embedding, 'base64');
    return new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
  });

  store = { chunks: data, vectors };
  return store;
}

// ─── Search ──────────────────────────────────────────────────────────────────

function search(queryVec: Float32Array, vs: VectorStore, limit: number) {
  const topK: { idx: number; score: number }[] = [];

  for (let i = 0; i < vs.vectors.length; i++) {
    const vec = vs.vectors[i];
    let dot = 0;
    for (let d = 0; d < queryVec.length; d++) {
      dot += queryVec[d] * vec[d];
    }

    if (topK.length < limit) {
      topK.push({ idx: i, score: dot });
      if (topK.length === limit) topK.sort((a, b) => a.score - b.score);
    } else if (dot > topK[0].score) {
      topK[0] = { idx: i, score: dot };
      topK.sort((a, b) => a.score - b.score);
    }
  }

  topK.sort((a, b) => b.score - a.score);

  return topK.map(({ idx, score }) => ({
    score: Math.round(score * 10000) / 10000,
    text: vs.chunks[idx].originalText,
    metadata: vs.chunks[idx].metadata,
  }));
}

// ─── MCP Handler ─────────────────────────────────────────────────────────────

const handler = createMcpHandler(
  server => {
    server.tool(
      'search_docs',
      'Search the Marigold Design System documentation by semantic similarity. Returns the most relevant documentation sections for a given query.',
      {
        query: z.string().min(1).max(1000).describe('The search query text'),
        limit: z
          .number()
          .int()
          .min(1)
          .max(20)
          .default(5)
          .describe('Number of results to return (default: 5)'),
      },
      async ({ query, limit }) => {
        try {
          const vectorStore = getStore();
          const queryVec = await embedQuery(query.trim());
          const results = search(queryVec, vectorStore, limit);

          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(results, null, 2),
              },
            ],
          };
        } catch {
          return {
            isError: true,
            content: [
              {
                type: 'text' as const,
                text: 'Search temporarily unavailable.',
              },
            ],
          };
        }
      }
    );
  },
  {
    serverInfo: {
      name: 'marigold-docs',
      version: '1.0.0',
    },
  }
);

export { handler as GET, handler as POST, handler as DELETE };
