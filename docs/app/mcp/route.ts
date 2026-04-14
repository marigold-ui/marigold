import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';

// process.cwd() is the docs/ root in Next.js
const CHUNKS_SEARCH_FILE = path.join(
  process.cwd(),
  'lib',
  'markdown',
  'chunks_search.json'
);

// ─── Config ──────────────────────────────────────────────────────────────────

const TITAN_MODEL_ID = 'amazon.titan-embed-text-v2:0';
const TITAN_DIMENSIONS = 512;
const AWS_REGION = 'eu-central-1';

const OIDC_AUTHORITY = process.env.OIDC_AUTHORITY;
const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID;
const KEYCLOAK_JWKS_URI = OIDC_AUTHORITY
  ? `${OIDC_AUTHORITY.replace(/\/$/, '')}/protocol/openid-connect/certs`
  : undefined;

// ─── Types ───────────────────────────────────────────────────────────────────

interface StoredChunk {
  id: number;
  originalText: string;
  metadata: { file: string; heading: string };
  embedding: string;
  dims: number;
}

// ─── Bedrock client (singleton) ──────────────────────────────────────────────

const bedrock = new BedrockRuntimeClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_BEDROCK_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_BEDROCK_SECRET_ACCESS_KEY ?? '',
  },
});

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

// ─── Vector store ─────────────────────

interface VectorStore {
  chunks: StoredChunk[];
  vectors: Float32Array[];
}

let store: VectorStore | null = null;

function getStore(): VectorStore {
  if (store) return store;

  const raw = fs.readFileSync(CHUNKS_SEARCH_FILE, 'utf-8');
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

// ─── Auth (Keycloak JWT) ─────────────────────────────────────────────────────

const jwks = KEYCLOAK_JWKS_URI
  ? createRemoteJWKSet(new URL(KEYCLOAK_JWKS_URI))
  : null;

const verifyToken = async (
  _req: Request,
  bearerToken?: string
): Promise<AuthInfo | undefined> => {
  if (!bearerToken || !jwks) return undefined;

  try {
    const { payload } = await jwtVerify(bearerToken, jwks, {
      issuer: OIDC_AUTHORITY,
      audience: OIDC_CLIENT_ID,
    });

    return {
      token: bearerToken,
      scopes: ['search:docs'],
      clientId: payload.sub ?? 'unknown',
    };
  } catch {
    return undefined;
  }
};

// ─── MCP Handler ────────────────────────────────────────────────────────────

const handler = createMcpHandler(
  server => {
    server.tool(
      'search_docs',
      [
        'Search the Marigold Design System documentation using semantic similarity.',
        'Use this tool to find component APIs, usage guidelines, accessibility notes, theming instructions, and code examples.',
        'Ideal for questions like: "How do I use the Button component?", "What props does Select accept?", or "How does theming work in Marigold?".',
        'Returns the most relevant documentation sections ranked by similarity to the query.',
        'Query must be a natural language question or keyword phrase (max 1000 characters).',
      ].join(' '),
      {
        query: z
          .string()
          .min(1)
          .max(1000)
          .describe(
            'Natural language question or keyword phrase to search for. Max 1000 characters. Example: "How do I disable a Button?" or "Select component props".'
          ),
        limit: z
          .number()
          .int()
          .min(3)
          .max(10)
          .default(5)
          .describe(
            'Number of documentation sections to return (3–10, default: 5). Use a higher value for broad topics, lower for specific lookups.'
          ),
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
        } catch (err) {
          console.error('[MCP] search_docs error:', err);
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

export const GET = withMcpAuth(handler, verifyToken, {
  required: true,
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
});

export const POST = GET;
export const DELETE = GET;
