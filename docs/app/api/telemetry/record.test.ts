import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TelemetryEvent } from './schema';

// This rate-limit/persist logic previously lived inline in route.ts and had
// zero direct test coverage (route.test.ts only ever exercised the
// "unconfigured" branch). Now that it's its own module, mock @upstash/redis
// to exercise the recorded/rate-limited/error branches directly.
const incr = vi.fn();
const expireMock = vi.fn();
const lpush = vi.fn();

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(function RedisMock() {
    return { incr, expire: expireMock, lpush };
  }),
}));

const mcpEvent: TelemetryEvent = {
  event: 'mcp_tool_call',
  tool: 'search_docs',
  hashedCallerId: 'a'.repeat(64),
  latencyMs: 120,
  success: true,
  topMatchFile: 'Button.mdx',
  topMatchHeading: 'Usage',
};

const cliEvent: TelemetryEvent = {
  event: 'cli_command',
  command: 'docs',
  cliVersion: '1.0.0',
  nodeVersion: '24.0.0',
  platform: 'darwin',
  isTTY: true,
  isAIAgent: false,
  durationBucket: '0-100',
  exitCode: 0,
  anonymousId: '00000000-0000-4000-8000-000000000000',
};

// vi.resetModules + a dynamic re-import gives each test a fresh module
// instance, so the module-level `redis` singleton cache in record.ts doesn't
// leak a client created under one test's env vars into the next test.
const loadRecord = async () => {
  vi.resetModules();
  return import('./record');
};

describe('recordTelemetryEvent', () => {
  beforeEach(() => {
    incr.mockReset();
    expireMock.mockReset();
    lpush.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns "unconfigured" when Redis env vars are unset', async () => {
    vi.stubEnv('KV_REST_API_URL', '');
    vi.stubEnv('KV_REST_API_TOKEN', '');
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('unconfigured');
    expect(incr).not.toHaveBeenCalled();
  });

  it('records an event and persists it under the daily key', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockResolvedValue(1);
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('recorded');
    expect(incr).toHaveBeenCalledWith(
      expect.stringMatching(/^telemetry:rl:mcp:a{64}:\d{4}-\d{2}-\d{2}$/)
    );
    expect(expireMock).toHaveBeenCalled();
    expect(lpush).toHaveBeenCalledWith(
      expect.stringMatching(/^telemetry:\d{4}-\d{2}-\d{2}$/),
      expect.stringContaining('"hashedCallerId":"' + 'a'.repeat(64) + '"')
    );
  });

  it('uses a cli-prefixed rate-limit key for cli_command events', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockResolvedValue(1);
    const { recordTelemetryEvent } = await loadRecord();

    await recordTelemetryEvent(cliEvent);

    expect(incr).toHaveBeenCalledWith(
      expect.stringMatching(
        /^telemetry:rl:cli:00000000-0000-4000-8000-000000000000:\d{4}-\d{2}-\d{2}$/
      )
    );
  });

  it('only calls expire on the first hit of the day', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockResolvedValue(2);
    const { recordTelemetryEvent } = await loadRecord();

    await recordTelemetryEvent(mcpEvent);

    expect(expireMock).not.toHaveBeenCalled();
  });

  it('returns "rate-limited" once the daily quota is exceeded', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockResolvedValue(1001);
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('rate-limited');
    expect(lpush).not.toHaveBeenCalled();
  });

  it('returns "error" and swallows a Redis failure', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockRejectedValue(new Error('boom'));
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('error');
  });

  it('returns "error" for an event that satisfies the type but not the runtime schema', async () => {
    // Defense-in-depth: a hand-built event (like the MCP route's) only
    // satisfies TelemetryEvent at compile time — this simulates a caller
    // producing a malformed hashedCallerId (wrong length) despite the type
    // checking out, which safeParse must still catch.
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    const { recordTelemetryEvent } = await loadRecord();
    const malformed = {
      ...mcpEvent,
      hashedCallerId: 'too-short',
    } as unknown as TelemetryEvent;

    const result = await recordTelemetryEvent(malformed);

    expect(result).toBe('error');
    expect(incr).not.toHaveBeenCalled();
  });
});
