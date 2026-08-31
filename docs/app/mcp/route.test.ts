import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import crypto from 'node:crypto';
import { after } from 'next/server';
import { searchDocsHandler } from './route';

// vi.mock factories are hoisted above all imports/consts in this file, so
// anything they reference must go through vi.hoisted().
const { send, recordTelemetryEvent, jwtVerify, mockChunks } = vi.hoisted(() => {
  const encodeEmbedding = (values: number[]): string => {
    const buf = Buffer.alloc(values.length * 4);
    values.forEach((v, i) => buf.writeFloatLE(v, i * 4));
    return buf.toString('base64');
  };

  return {
    send: vi.fn(),
    recordTelemetryEvent: vi.fn().mockResolvedValue('recorded'),
    jwtVerify: vi.fn(),
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

vi.mock('jose', () => ({
  jwtVerify,
  createRemoteJWKSet: vi.fn(() => 'jwks'),
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

// Shorthand for cases that don't care how the AuthInfo got built; the test
// below pins the real mapping end to end.
const authInfoForSub = (sub: string): AuthInfo => ({
  token: 'token',
  scopes: [],
  clientId: 'dst-marigold-docs-mcp',
  extra: { sub },
});

const authInfo = authInfoForSub(SUB);

const search = (extra: { authInfo?: AuthInfo }) =>
  searchDocsHandler({ query: 'button', limit: 3 }, extra);

describe('searchDocsHandler', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    recordTelemetryEvent.mockClear();
    recordTelemetryEvent.mockResolvedValue('recorded');
    send.mockReset();
    send.mockResolvedValue({
      body: new TextEncoder().encode(JSON.stringify({ embedding: [1, 0] })),
    });
    // Reset `after` to the default inline-invoke impl so a mockImplementationOnce
    // queued by a test that returned early can't leak into the next one.
    vi.mocked(after).mockReset();
    vi.mocked(after).mockImplementation((task: () => unknown) => task());
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubEnv('MCP_TELEMETRY_HASH_SECRET', HASH_SECRET);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
    // Explicitly, not vi.restoreAllMocks() — that would also strip the
    // implementations off the hoisted Bedrock/fs factory mocks, which the
    // resetModules test below re-instantiates.
    warn.mockRestore();
  });

  it('records a successful call with the top match and a real latency', async () => {
    const result = await search({ authInfo });

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
    const result = await search({ authInfo });

    expect(result.isError).toBe(true);
    expect(recordTelemetryEvent).toHaveBeenCalledTimes(1);
    const [event] = recordTelemetryEvent.mock.calls[0];
    expect(event.success).toBe(false);
    expect(event.topMatchFile).toBeUndefined();
    expect(event.topMatchHeading).toBeUndefined();
  });

  // Drives a verified token all the way through to the recorded digest, rather
  // than hand-building the AuthInfo — so a dependency that stopped carrying the
  // subject through `extra` would fail here instead of silently zeroing
  // unique-caller counts.
  it('hashes the verified JWT sub, not any other claim', async () => {
    jwtVerify.mockResolvedValue({
      payload: { sub: SUB, azp: 'dst-marigold-docs-mcp' },
    });
    // OIDC_AUTHORITY is read at module load to build the JWKS URL, so it has to
    // be a valid URL before the import, not just before the call.
    vi.stubEnv('OIDC_AUTHORITY', 'https://keycloak.example/realms/rx');
    vi.resetModules();
    const { verifyToken: verify, searchDocsHandler: handler } =
      await import('./route');

    const verified = await verify(
      new Request('http://localhost/mcp'),
      'bearer-token'
    );
    await handler({ query: 'button', limit: 3 }, { authInfo: verified });

    expect(verified).toBeDefined();
    const [event] = recordTelemetryEvent.mock.calls[0];
    expect(event.hashedCallerId).toBe(expectedHash);
  });

  it('derives a distinct hashedCallerId per caller, and never sends the raw sub', async () => {
    await search({ authInfo });
    await search({ authInfo: authInfoForSub('other-user') });

    const [first] = recordTelemetryEvent.mock.calls[0];
    const [second] = recordTelemetryEvent.mock.calls[1];

    expect(first.hashedCallerId).toBe(expectedHash);
    expect(second.hashedCallerId).not.toBe(first.hashedCallerId);
    // The raw Keycloak sub identifies an individual employee — it must not
    // appear anywhere in the recorded event.
    expect(JSON.stringify(first)).not.toContain(SUB);
  });

  it('does not warn when recording is merely unconfigured', async () => {
    recordTelemetryEvent.mockResolvedValue('unconfigured');

    await search({ authInfo });

    expect(recordTelemetryEvent).toHaveBeenCalledTimes(1);
    expect(warn).not.toHaveBeenCalled();
  });

  it('warns once per distinct cause, not once per call and not once overall', async () => {
    vi.resetModules();
    const { searchDocsHandler: handler } = await import('./route');

    // One module instance throughout, so this pins the granularity: causes
    // dedupe independently rather than the first warning silencing the rest.
    for (const result of [
      'error',
      'error',
      'rate-limited',
      'rate-limited',
      'invalid',
      'unconfigured',
      'unconfigured',
    ] as const) {
      recordTelemetryEvent.mockResolvedValue(result);
      await handler({ query: 'button', limit: 3 }, { authInfo });
    }

    expect(recordTelemetryEvent).toHaveBeenCalledTimes(7);
    // Three causes, three warnings despite the repeats — and 'unconfigured',
    // the steady state in local dev and preview deploys, stays silent.
    expect(warn.mock.calls.map(([message]: unknown[]) => message)).toEqual([
      expect.stringContaining('error'),
      expect.stringContaining('rate-limited'),
      expect.stringContaining('invalid'),
    ]);
  });

  it('still returns a successful search when after() itself throws, warning once', async () => {
    // Next's after() throws synchronously with no request scope — true of
    // every call, so it must not fail the search or log per call.
    vi.resetModules();
    const { searchDocsHandler: handler } = await import('./route');
    vi.mocked(after).mockImplementation(() => {
      throw new Error('no request scope');
    });

    const result = await handler({ query: 'button', limit: 3 }, { authInfo });
    await handler({ query: 'button', limit: 3 }, { authInfo });

    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('Button usage');
    expect(recordTelemetryEvent).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('telemetry emission failed');
  });

  it('warns once, then skips telemetry, when no hash secret is configured', async () => {
    vi.stubEnv('MCP_TELEMETRY_HASH_SECRET', '');
    // Fresh module instance so the once-per-process warn flag starts unset
    // regardless of what earlier tests in this file did.
    vi.resetModules();
    const { searchDocsHandler: handler } = await import('./route');

    const result = await handler({ query: 'button', limit: 3 }, { authInfo });
    await handler({ query: 'button', limit: 3 }, { authInfo });

    expect(result.isError).toBeUndefined();
    expect(recordTelemetryEvent).not.toHaveBeenCalled();
    // Otherwise a deployment that never sets the secret logs on every call.
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('MCP_TELEMETRY_HASH_SECRET');
  });

  it('computes latencyMs before deferring to after(), not inside its callback', async () => {
    // Hold after()'s task back, jump the clock far forward, then run it. Fake
    // timers freeze Date.now(), so a correctly-computed latencyMs is exactly 0;
    // computed inside the callback it would pick up the whole jump. No real
    // sleep, so there's no duration threshold to flake on.
    vi.useFakeTimers();
    let deferred: (() => unknown) | undefined;
    vi.mocked(after).mockImplementationOnce(task => {
      if (typeof task === 'function') deferred = task as () => unknown;
    });

    await search({ authInfo });

    expect(recordTelemetryEvent).not.toHaveBeenCalled();

    vi.advanceTimersByTime(60_000);
    await deferred?.();

    expect(recordTelemetryEvent).toHaveBeenCalledTimes(1);
    const [event] = recordTelemetryEvent.mock.calls[0];
    expect(event.latencyMs).toBe(0);
  });

  it('skips telemetry when there is no caller sub', async () => {
    const result = await search({ authInfo: undefined });

    expect(result.isError).toBeUndefined();
    expect(recordTelemetryEvent).not.toHaveBeenCalled();
  });

  describe('verifyToken', () => {
    const loadVerify = async () => {
      jwtVerify.mockClear();
      vi.stubEnv('OIDC_AUTHORITY', 'https://keycloak.example/realms/rx');
      vi.resetModules();
      return (await import('./route')).verifyToken;
    };
    const req = () => new Request('http://localhost/mcp');

    it('returns undefined without a bearer token, without calling the JWKS', async () => {
      const verify = await loadVerify();

      await expect(verify(req(), undefined)).resolves.toBeUndefined();
      expect(jwtVerify).not.toHaveBeenCalled();
    });

    it('returns undefined when verification throws, rather than propagating', async () => {
      jwtVerify.mockRejectedValue(new Error('bad signature'));
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      const verify = await loadVerify();

      await expect(verify(req(), 'token')).resolves.toBeUndefined();
      expect(error).toHaveBeenCalled();
      error.mockRestore();
    });

    // A token that verifies but carries no subject cannot be attributed, and
    // attributing it to a shared fallback would collapse every caller into one.
    it('returns undefined when the verified payload has no sub', async () => {
      jwtVerify.mockResolvedValue({ payload: { azp: 'some-client' } });
      const verify = await loadVerify();

      await expect(verify(req(), 'token')).resolves.toBeUndefined();
    });

    it('carries the subject in `extra`, not in `clientId`', async () => {
      jwtVerify.mockResolvedValue({ payload: { sub: SUB, azp: 'caller-app' } });
      const verify = await loadVerify();

      const info = await verify(req(), 'token');

      expect(info?.extra).toEqual({ sub: SUB });
      expect(info?.clientId).toBe('caller-app');
    });
  });

  // The README promises telemetry is never a hard failure but never silent
  // either. Every other cause warns once; this one used to return quietly.
  it('warns once when the verified token carries no subject', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // Fresh instance so the once-per-process flag starts unset, regardless of
    // what earlier tests in this file already consumed.
    vi.resetModules();
    const { searchDocsHandler: handler } = await import('./route');
    const subjectless = { token: 't', scopes: [], clientId: 'c' };

    await handler({ query: 'button', limit: 3 }, { authInfo: subjectless });
    await handler({ query: 'button', limit: 3 }, { authInfo: subjectless });

    expect(recordTelemetryEvent).not.toHaveBeenCalled();
    expect(
      warn.mock.calls.filter(([m]) => String(m).includes('no subject'))
    ).toHaveLength(1);
    warn.mockRestore();
  });
});
