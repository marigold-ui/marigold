import { recordTelemetryEvent } from '@/app/api/telemetry/record';
import type { TelemetryEvent } from '@/app/api/telemetry/schema';
import { lazy } from '@/lib/lazy';
import {
  AWS_REGION,
  TITAN_DIMENSIONS,
  TITAN_MODEL_ID,
} from '@/lib/markdown/etl/config';
import { createWarnOnce } from '@/lib/warn-once';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
import { z } from 'zod';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { after } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// process.cwd() is the docs/ root in Next.js
const EMBEDDINGS_FILE = path.join(
  process.cwd(),
  'lib',
  'markdown',
  'embeddings.json'
);

// ─── Config ──────────────────────────────────────────────────────────────────

const OIDC_AUTHORITY = process.env.OIDC_AUTHORITY || '';
const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || '';
const KEYCLOAK_JWKS_URI = `${OIDC_AUTHORITY.replace(/\/$/, '')}/protocol/openid-connect/certs`;

// ─── Types ───────────────────────────────────────────────────────────────────

type StoredChunk = {
  id: number;
  originalText: string;
  metadata: { file: string; heading: string };
  embedding: string;
  dims: number;
};

// ─── Bedrock client (lazy singleton) ─────────────────────────────────────────

let bedrock: BedrockRuntimeClient | null = null;

function getBedrock(): BedrockRuntimeClient {
  if (bedrock) return bedrock;

  const accessKeyId = process.env.AWS_BEDROCK_ACCESS_KEY_ID || '';
  const secretAccessKey = process.env.AWS_BEDROCK_SECRET_ACCESS_KEY || '';

  bedrock = new BedrockRuntimeClient({
    region: AWS_REGION,
    credentials: { accessKeyId, secretAccessKey },
  });
  return bedrock;
}

async function embedQuery(text: string): Promise<Float32Array> {
  const res = await getBedrock().send(
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

type VectorStore = {
  chunks: StoredChunk[];
  vectors: Float32Array[];
};

function loadStore(): VectorStore {
  const raw = fs.readFileSync(EMBEDDINGS_FILE, 'utf-8');
  const data: StoredChunk[] = JSON.parse(raw);

  const vectors = data.map(chunk => {
    const buf = Buffer.from(chunk.embedding, 'base64');
    const floats = new Float32Array(buf.byteLength / 4);
    for (let i = 0; i < floats.length; i++) {
      floats[i] = buf.readFloatLE(i * 4);
    }
    return floats;
  });

  return { chunks: data, vectors };
}

// Lazy so module init does not require embeddings.json (local builds skip it; production bundles it via outputFileTracingIncludes).
let store: VectorStore | null = null;
const getStore = (): VectorStore => {
  if (!store) store = loadStore();
  return store;
};

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

// ─── Telemetry ────────────────────────────────────────────────────────────────

const warnOnce = createWarnOnce();

// One-way HMAC of the caller's Keycloak `sub` claim — never the raw claim,
// which identifies a Reservix employee. Stable for the life of the secret, on
// purpose: see ../api/telemetry/README.md.
const hashCallerId = (sub: string): string | null => {
  const secret = process.env.MCP_TELEMETRY_HASH_SECRET;
  if (!secret) {
    warnOnce(
      'missing-secret',
      '[MCP] MCP_TELEMETRY_HASH_SECRET is not set — search_docs telemetry is disabled for this deployment. See docs/app/mcp/README.md#telemetry.'
    );
    return null;
  }
  return crypto.createHmac('sha256', secret).update(sub).digest('hex');
};

// ─── Auth (Keycloak JWT) ─────────────────────────────────────────────────────

const getJwks = lazy(() => createRemoteJWKSet(new URL(KEYCLOAK_JWKS_URI)));

const subjectOf = (authInfo?: AuthInfo): string | undefined =>
  typeof authInfo?.extra?.sub === 'string' ? authInfo.extra.sub : undefined;

export const verifyToken = async (
  _req: Request,
  bearerToken?: string
): Promise<AuthInfo | undefined> => {
  if (!bearerToken) return undefined;

  try {
    const { payload } = await jwtVerify(bearerToken, getJwks(), {
      issuer: OIDC_AUTHORITY,
      audience: OIDC_CLIENT_ID,
    });

    if (!payload.sub) return undefined;

    return {
      token: bearerToken,
      // The calling client, not our own audience. Required by AuthInfo and
      // unread by us; the subject travels in `extra`.
      clientId: typeof payload.azp === 'string' ? payload.azp : OIDC_CLIENT_ID,
      scopes: [],
      extra: { sub: payload.sub },
    };
  } catch (err) {
    console.error('[MCP] JWT verification failed:', err);
    return undefined;
  }
};

// ─── search_docs ─────────────────────────────────────────────────────────────

const SEARCH_DOCS_DESCRIPTION = [
  'Search the Marigold Design System documentation using semantic similarity.',
  'Use this tool to find component APIs, usage guidelines, accessibility notes, theming instructions, and code examples.',
  'Ideal for questions like: "How do I use the Button component?", "What props does Select accept?", or "How does theming work in Marigold?".',
  'Returns the most relevant documentation sections ranked by similarity to the query.',
  'Query must be a natural language question or keyword phrase (max 1000 characters).',
].join(' ');

const SEARCH_DOCS_SCHEMA = {
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
};

// Exported separately from the MCP tool registration below so it's
// unit-testable without going through the full MCP transport/auth chain.
export const searchDocsHandler = async (
  { query, limit }: { query: string; limit: number },
  extra: { authInfo?: AuthInfo }
) => {
  const startedAt = Date.now();

  const emitTelemetry = (
    success: boolean,
    topMatch?: { file: string; heading: string }
  ) => {
    // The whole body, not just after(): this is called again from the outer
    // catch below, so anything escaping here would throw a second time with no
    // handler left — an unhandled rejection instead of the isError response.
    try {
      const sub = subjectOf(extra.authInfo);
      if (!sub) {
        warnOnce(
          'no-subject',
          '[MCP] search_docs telemetry skipped: the verified token carried no subject. If a dependency upgrade changed how AuthInfo travels, see docs/app/mcp/README.md#telemetry.'
        );
        return;
      }

      const hashedCallerId = hashCallerId(sub);
      if (!hashedCallerId) return;

      // Built before after() is called, not inside the callback, so latencyMs
      // measures embed+search rather than whenever the callback ran.
      const event: TelemetryEvent = {
        event: 'mcp_tool_call',
        tool: 'search_docs',
        hashedCallerId,
        latencyMs: Date.now() - startedAt,
        success,
        topMatchFile: topMatch?.file,
        topMatchHeading: topMatch?.heading,
      };

      after(async () => {
        const result = await recordTelemetryEvent(event);
        if (result !== 'recorded' && result !== 'unconfigured') {
          warnOnce(
            result,
            `[MCP] search_docs telemetry not recorded: ${result}`
          );
        }
      });
    } catch (err) {
      // Most likely after() throwing for lack of a request scope — true of
      // every call, hence once per process.
      warnOnce(
        'emit-failed',
        `[MCP] search_docs telemetry emission failed: ${err}`
      );
    }
  };

  try {
    const queryVec = await embedQuery(query.trim());
    const results = search(queryVec, getStore(), limit);

    emitTelemetry(true, results[0]?.metadata);

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
    emitTelemetry(false);
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
};

// ─── MCP Handler ────────────────────────────────────────────────────────────

const handler = createMcpHandler(
  server => {
    server.tool(
      'search_docs',
      SEARCH_DOCS_DESCRIPTION,
      SEARCH_DOCS_SCHEMA,
      searchDocsHandler
    );
  },
  {
    serverInfo: {
      name: 'marigold-docs',
      version: '1.0.0',
    },
  }
);

const authOptions = {
  required: true,
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
};

const mcpHandler = withMcpAuth(handler, verifyToken, authOptions);

export const GET = mcpHandler;
export const POST = mcpHandler;
export const DELETE = mcpHandler;
