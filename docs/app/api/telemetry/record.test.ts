import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TelemetryEvent } from './schema';

const incr = vi.fn();
const expireMock = vi.fn();
const xadd = vi.fn();

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(function RedisMock() {
    return { incr, expire: expireMock, xadd };
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
    xadd.mockReset();
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
    expect(xadd).toHaveBeenCalledWith(
      'telemetry:events',
      '*',
      {
        data: expect.stringContaining(
          '"hashedCallerId":"' + 'a'.repeat(64) + '"'
        ),
      },
      expect.objectContaining({
        trim: expect.objectContaining({ type: 'MINID', comparison: '~' }),
      })
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

  it('sets the rate-limit TTL with NX on every hit, not just the first', async () => {
    // NX makes EXPIRE idempotent server-side, so calling it unconditionally
    // never pushes the window out — and a first-hit EXPIRE lost to a network
    // blip is retried by every later event instead of leaving the key
    // TTL-less for the rest of the day.
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockResolvedValue(2);
    const { recordTelemetryEvent } = await loadRecord();

    await recordTelemetryEvent(mcpEvent);

    expect(expireMock).toHaveBeenCalledWith(
      expect.stringMatching(/^telemetry:rl:mcp:/),
      24 * 60 * 60,
      'NX'
    );
  });

  it('returns "rate-limited" once the daily quota is exceeded', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockResolvedValue(1001);
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('rate-limited');
    expect(xadd).not.toHaveBeenCalled();
  });

  it('returns "error" and swallows a Redis failure', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockRejectedValue(new Error('boom'));
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('error');
  });

  // Defense-in-depth: a hand-built event (like the MCP route's) only satisfies
  // TelemetryEvent at compile time, not Zod's runtime constraints. These are
  // asserted here rather than through the public POST route, which no longer
  // accepts mcp_tool_call events at all.
  it.each([
    ['a hashedCallerId of the wrong length', { hashedCallerId: 'too-short' }],
    [
      'a hashedCallerId that is 64 non-hex chars',
      { hashedCallerId: 'z'.repeat(64) },
    ],
    ['an unknown tool', { tool: 'bogus_tool' }],
    ['a missing required field', { hashedCallerId: undefined }],
    [
      'a topMatchHeading over the length cap',
      { topMatchHeading: 'x'.repeat(513) },
    ],
  ])(
    'returns "invalid" for an mcp_tool_call event with %s',
    async (_, patch) => {
      vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
      vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
      const { recordTelemetryEvent } = await loadRecord();
      const malformed = { ...mcpEvent, ...patch } as unknown as TelemetryEvent;

      const result = await recordTelemetryEvent(malformed);

      // 'invalid', not 'error' — the event is a code bug on our side, not a
      // Redis outage, and the two want different responses.
      expect(result).toBe('invalid');
      expect(incr).not.toHaveBeenCalled();
    }
  );

  // The HTTP route already hands over parsed output; this is the in-process MCP
  // path, where the caller hand-builds the event and only satisfies the type.
  it('persists the parsed event, not the caller-supplied object', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    incr.mockResolvedValue(1);
    const { recordTelemetryEvent } = await loadRecord();
    const withExtras = {
      ...mcpEvent,
      rawSub: 'employee@reservix.de',
    } as unknown as TelemetryEvent;

    const result = await recordTelemetryEvent(withExtras);

    expect(result).toBe('recorded');
    const [, , entries] = xadd.mock.calls[0];
    const payload = entries.data;
    expect(payload).not.toContain('rawSub');
    expect(payload).not.toContain('employee@reservix.de');
    expect(JSON.parse(payload)).toMatchObject({ event: 'mcp_tool_call' });
  });

  // Carried over from the daily-list layout, where retention was a separate
  // EXPIRE that could land on the wrong day key or be skipped entirely. The
  // stream makes it part of the write, so what's worth pinning is that every
  // write carries a trim and that the cutoff is the one we intend.
  describe('stream retention', () => {
    beforeEach(() => {
      vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
      vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
      incr.mockResolvedValue(1);
      expireMock.mockResolvedValue(1);
      xadd.mockResolvedValue('1-0');
    });

    it('trims to the retention cutoff, so the stream cannot grow without bound', async () => {
      const { recordTelemetryEvent } = await loadRecord();
      vi.useFakeTimers();
      try {
        vi.setSystemTime(new Date('2026-06-01T12:00:00.000Z'));

        await recordTelemetryEvent(cliEvent);

        const [, , , opts] = xadd.mock.calls[0];
        expect(opts.trim.type).toBe('MINID');
        const cutoff = Number(opts.trim.threshold);
        expect(Date.now() - cutoff).toBe(200 * 24 * 60 * 60 * 1000);
      } finally {
        vi.useRealTimers();
      }
    });

    it('trims on every write, not just the first, so retention never lapses', async () => {
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(cliEvent);
      await recordTelemetryEvent(cliEvent);

      expect(xadd).toHaveBeenCalledTimes(2);
      for (const [, , , opts] of xadd.mock.calls) {
        expect(opts.trim).toMatchObject({ type: 'MINID', comparison: '~' });
      }
    });

    it('writes and trims in one command, so a write can never land untrimmed', async () => {
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(cliEvent);

      // The whole point of MINID-on-XADD: no second round trip that could fail
      // on its own and leave the stream unbounded.
      expect(xadd).toHaveBeenCalledTimes(1);
      const dayKeyExpires = expireMock.mock.calls.filter(([key]) =>
        /^telemetry:\d{4}-\d{2}-\d{2}$/.test(key as string)
      );
      expect(dayKeyExpires).toHaveLength(0);
    });
  });
});
