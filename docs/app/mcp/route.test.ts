import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import crypto from 'node:crypto';
import { after } from 'next/server';
import { searchDocsHandler } from './route';

// First test file for this route. Scope is deliberately narrow: verify the
// telemetry wiring added around `search_docs` (DST-1625), not a full
// pre-existing-code backfill. Driving this through the real exported
// GET/POST handlers would require simulating full MCP tools/call JSON-RPC
// framing AND working around a module-load-time OIDC/JWKS config that throws
// before auth even completes in a test environment — see the comment on
// `searchDocsHandler`'s export in route.ts. Testing the exported function
// directly sidesteps all of that.

// vi.mock factories are hoisted above all imports/consts in this file, so
// anything they reference must go through vi.hoisted() to avoid a
// "cannot access before initialization" error.
const { send, recordTelemetryEvent, mockChunks } = vi.hoisted(() => {
  // Two toy 2-dimensional chunks: the first exactly matches the mock query
  // embedding ([1, 0]) and should score highest; the second is orthogonal and
  // should score lowest — makes the "top match" deterministic.
  const encodeEmbedding = (values: number[]): string => {
    const buf = Buffer.alloc(values.length * 4);
    values.forEach((v, i) => buf.writeFloatLE(v, i * 4));
    return buf.toString('base64');
  };

  return {
    send: vi.fn(),
    recordTelemetryEvent: vi.fn().mockResolvedValue('recorded'),
    mockChunks: [
      {
        id: 0,
        originalText: 'Button usage',
        metadata: { file: 'Button.mdx', heading: 'Usage' },
        embedding: encodeEmbedding([1, 0]),
        dims: 2,
      },
      {
        id: 1,
        originalText: 'Select usage',
        metadata: { file: 'Select.mdx', heading: 'Usage' },
        embedding: encodeEmbedding([0, 1]),
        dims: 2,
      },
    ],
  };
});

vi.mock('@aws-sdk/client-bedrock-runtime', () => ({
  BedrockRuntimeClient: vi.fn().mockImplementation(function BedrockMock() {
    return { send };
  }),
  InvokeModelCommand: vi.fn().mockImplementation(function CommandMock(input) {
    return input;
  }),
}));

vi.mock('node:fs', () => ({
  default: {
    readFileSync: vi.fn(() => JSON.stringify(mockChunks)),
  },
}));

vi.mock('@/app/api/telemetry/record', () => ({
  recordTelemetryEvent,
}));

// `after()` needs an active Next.js request scope, which doesn't exist under
// plain Vitest — mock it to just invoke the callback so its effects
// (recordTelemetryEvent) can be asserted synchronously.
vi.mock('next/server', () => ({
  after: vi.fn((task: () => unknown) => task()),
}));

const HASH_SECRET = 'test-secret';
const SUB = 'user-123';
const expectedHash = crypto
  .createHmac('sha256', HASH_SECRET)
  .update(SUB)
  .digest('hex');

const authInfo: AuthInfo = { token: 'token', scopes: [], clientId: SUB };

describe('searchDocsHandler', () => {
  beforeEach(() => {
    recordTelemetryEvent.mockClear();
    send.mockReset();
    send.mockResolvedValue({
      body: new TextEncoder().encode(JSON.stringify({ embedding: [1, 0] })),
    });
    vi.stubEnv('MCP_TELEMETRY_HASH_SECRET', HASH_SECRET);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('records a successful call with the top match and a real latency', async () => {
    const result = await searchDocsHandler(
      { query: 'button', limit: 3 },
      {
        authInfo,
      }
    );

    expect(result.isError).toBeUndefined();
    expect(recordTelemetryEvent).toHaveBeenCalledTimes(1);
    expect(recordTelemetryEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'mcp_tool_call',
        tool: 'search_docs',
        hashedCallerId: expectedHash,
        success: true,
        topMatchFile: 'Button.mdx',
        topMatchHeading: 'Usage',
      })
    );
    const [event] = recordTelemetryEvent.mock.calls[0];
    expect(event.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('records a failed call with no top-match fields', async () => {
    send.mockRejectedValue(new Error('bedrock unavailable'));
    const result = await searchDocsHandler(
      { query: 'button', limit: 3 },
      {
        authInfo,
      }
    );

    expect(result.isError).toBe(true);
    expect(recordTelemetryEvent).toHaveBeenCalledTimes(1);
    const [event] = recordTelemetryEvent.mock.calls[0];
    expect(event.success).toBe(false);
    expect(event.topMatchFile).toBeUndefined();
    expect(event.topMatchHeading).toBeUndefined();
  });

  it('skips telemetry entirely when no hash secret is configured', async () => {
    vi.stubEnv('MCP_TELEMETRY_HASH_SECRET', '');
    const result = await searchDocsHandler(
      { query: 'button', limit: 3 },
      {
        authInfo,
      }
    );

    expect(result.isError).toBeUndefined();
    expect(recordTelemetryEvent).not.toHaveBeenCalled();
  });

  it('computes latencyMs before deferring to after(), not inside its callback', async () => {
    // Delay running after()'s task, simulating the response having already
    // been sent by the time the deferred callback actually executes. If
    // latencyMs were (mis)computed inside that callback, it would include
    // this artificial delay; computed beforehand, it stays small regardless
    // of when the callback runs.
    vi.mocked(after).mockImplementationOnce(task => {
      setTimeout(task, 50);
    });

    await searchDocsHandler({ query: 'button', limit: 3 }, { authInfo });
    await new Promise(resolve => setTimeout(resolve, 80));

    expect(recordTelemetryEvent).toHaveBeenCalledTimes(1);
    const [event] = recordTelemetryEvent.mock.calls[0];
    expect(event.latencyMs).toBeLessThan(50);
  });

  it('skips telemetry when there is no caller sub', async () => {
    const result = await searchDocsHandler(
      { query: 'button', limit: 3 },
      { authInfo: undefined }
    );

    expect(result.isError).toBeUndefined();
    expect(recordTelemetryEvent).not.toHaveBeenCalled();
  });
});
