import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TelemetryEvent } from './schema';
import { makeCliEvent, makeMcpEvent } from './test.utils';

const incr = vi.fn();
const expireMock = vi.fn();
const xadd = vi.fn();

const { redisCtor } = vi.hoisted(() => ({ redisCtor: vi.fn() }));

// pipeline() delegates to the same spies as the direct calls, so a test can
// drive the counter with `incr.mockResolvedValue(n)` either way.
const pipeline = () => {
  const queued: Promise<unknown>[] = [];
  const chain = {
    incr: (...a: unknown[]) => (queued.push(incr(...a)), chain),
    expire: (...a: unknown[]) => (queued.push(expireMock(...a)), chain),
    // Mirrors exec({ keepErrors: true }): per-command {error, result} pairs.
    exec: async () =>
      (await Promise.allSettled(queued)).map(r =>
        r.status === 'fulfilled'
          ? { error: undefined, result: r.value }
          : { error: String(r.reason), result: undefined }
      ),
  };
  return chain;
};

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(function RedisMock(...args: unknown[]) {
    redisCtor(...args);
    return { incr, expire: expireMock, xadd, pipeline };
  }),
}));

const mcpEvent = makeMcpEvent() as TelemetryEvent;
const cliEvent = makeCliEvent({ command: 'docs' }) as TelemetryEvent;

// A fresh module instance per test, so record.ts's cached `redis` singleton
// can't leak a client built under one test's env vars into the next.
const loadRecord = async () => {
  vi.resetModules();
  return import('./record');
};

describe('recordTelemetryEvent', () => {
  beforeEach(() => {
    // Configured by default; the one unconfigured case overrides below.
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
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

  it('records an event and appends it to the events stream', async () => {
    incr.mockResolvedValue(1);
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('recorded');
    expect(incr).toHaveBeenCalledWith(
      expect.stringMatching(/^telemetry:rl:mcp:a{64}:\d{4}-\d{2}-\d{2}$/)
    );
    expect(expireMock).toHaveBeenCalled();
    expect(xadd).toHaveBeenCalledWith('telemetry:events', '*', {
      data: expect.stringContaining(
        '"hashedCallerId":"' + 'a'.repeat(64) + '"'
      ),
    });
  });

  it('uses a cli-prefixed rate-limit key for cli_command events', async () => {
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
    incr.mockResolvedValue(2);
    const { recordTelemetryEvent } = await loadRecord();

    await recordTelemetryEvent(mcpEvent);

    expect(expireMock).toHaveBeenCalledWith(
      expect.stringMatching(/^telemetry:rl:mcp:/),
      24 * 60 * 60,
      'NX'
    );
  });

  it('returns "rate-limited" once the daily quota is exceeded, without writing', async () => {
    incr.mockResolvedValue(10_001);
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('rate-limited');
    expect(xadd).not.toHaveBeenCalled();
  });

  it('returns "error" and swallows a Redis failure', async () => {
    incr.mockRejectedValue(new Error('boom'));
    const { recordTelemetryEvent } = await loadRecord();

    const result = await recordTelemetryEvent(mcpEvent);

    expect(result).toBe('error');
  });

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
      const { recordTelemetryEvent } = await loadRecord();
      const malformed = { ...mcpEvent, ...patch } as unknown as TelemetryEvent;

      const result = await recordTelemetryEvent(malformed);

      // 'invalid', not 'error' — the event is a code bug on our side, not a
      // Redis outage, and the two want different responses.
      expect(result).toBe('invalid');
      expect(incr).not.toHaveBeenCalled();
    }
  );

  it('persists the parsed event, not the caller-supplied object', async () => {
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

  // A stray trim option would drop the tail silently, so assert its absence.
  describe('retention', () => {
    beforeEach(() => {
      incr.mockResolvedValue(1);
    });

    it('appends without trimming, so no history is ever dropped', async () => {
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(cliEvent);

      expect(xadd).toHaveBeenCalledTimes(1);
      // Three args exactly: key, id, entry. A fourth would carry `trim`.
      expect(xadd.mock.calls[0]).toHaveLength(3);
    });

    it('sets no TTL on the stream key, only on the rate-limit key', async () => {
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(cliEvent);

      const expiredKeys = expireMock.mock.calls.map(([key]) => key);
      expect(expiredKeys).not.toContain('telemetry:events');
      expect(
        expiredKeys.every(k => String(k).startsWith('telemetry:rl:'))
      ).toBe(true);
    });
  });

  // A trailing newline in KV_REST_API_URL is enough to make the constructor
  // throw, and neither caller can absorb a rejection.
  it('returns "error" rather than rejecting when the Redis client fails to construct', async () => {
    redisCtor.mockImplementationOnce(() => {
      throw new Error('[Upstash Redis] The provided URL is invalid');
    });
    const { recordTelemetryEvent } = await loadRecord();

    await expect(recordTelemetryEvent(cliEvent)).resolves.toBe('error');
    expect(incr).not.toHaveBeenCalled();
  });

  it('gives mcp_tool_call events a 10x higher ceiling than cli_command', async () => {
    incr.mockResolvedValue(1_001);
    const { recordTelemetryEvent } = await loadRecord();

    await expect(recordTelemetryEvent(cliEvent)).resolves.toBe('rate-limited');
    await expect(recordTelemetryEvent(mcpEvent)).resolves.toBe('recorded');
  });

  it('still drops mcp_tool_call events past their own ceiling, so a runaway loop is bounded', async () => {
    incr.mockResolvedValue(10_001);
    const { recordTelemetryEvent } = await loadRecord();

    await expect(recordTelemetryEvent(mcpEvent)).resolves.toBe('rate-limited');
  });

  it('logs the cause of a Redis failure once per process, not per call', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    incr.mockRejectedValue(new Error('upstash down'));
    const { recordTelemetryEvent } = await loadRecord();

    await recordTelemetryEvent(cliEvent);
    await recordTelemetryEvent(cliEvent);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('upstash down');
    warn.mockRestore();
  });

  // Unbounded retention rests on this one — see ./README.md
  describe('isPublicQuotaExceeded', () => {
    it('counts one fixed key per day, derived from no caller input', async () => {
      incr.mockResolvedValue(1);
      const { isPublicQuotaExceeded } = await loadRecord();

      await expect(isPublicQuotaExceeded()).resolves.toBe(false);
      expect(incr).toHaveBeenCalledTimes(1);
      expect(incr).toHaveBeenCalledWith(
        expect.stringMatching(/^telemetry:rl:public:\d{4}-\d{2}-\d{2}$/)
      );
    });

    it('reports exceeded past the ceiling, and gives the key a TTL', async () => {
      incr.mockResolvedValue(50_001);
      const { isPublicQuotaExceeded } = await loadRecord();

      await expect(isPublicQuotaExceeded()).resolves.toBe(true);
      expect(expireMock).toHaveBeenCalledWith(
        expect.stringContaining('telemetry:rl:public:'),
        24 * 60 * 60,
        'NX'
      );
    });

    // Fails open: a check that could not run must not turn traffic away, and
    // must never reject either. The boolean makes that structural — there is
    // no third state a caller could accidentally branch on.
    it.each([
      ['Redis is unconfigured', false],
      ['the Redis call fails', true],
    ])('returns false when %s', async (_, redisConfigured) => {
      if (redisConfigured) {
        incr.mockRejectedValue(new Error('upstash down'));
      } else {
        vi.stubEnv('KV_REST_API_URL', '');
        vi.stubEnv('KV_REST_API_TOKEN', '');
      }
      const { isPublicQuotaExceeded } = await loadRecord();

      await expect(isPublicQuotaExceeded()).resolves.toBe(false);
    });
  });
});
