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

const mcpEvent = makeMcpEvent();
const cliEvent = makeCliEvent({ command: 'docs' });

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

  // There is no per-caller key for the CLI to use: its payload carries no
  // identifier to build one from. Asserting the absence keeps a future
  // `telemetry:rl:cli:…` from quietly reintroducing one, which is the whole
  // thing packages/cli/src/lib/config.ts removed.
  it('charges no per-caller key for cli_command events', async () => {
    incr.mockResolvedValue(1);
    const { recordTelemetryEvent } = await loadRecord();

    await recordTelemetryEvent(cliEvent);

    expect(incr).not.toHaveBeenCalledWith(
      expect.stringContaining('telemetry:rl:cli:')
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

  // The two sources sit on different ceilings, and the shared one must be
  // charged by CLI traffic only. Spending it on MCP traffic, which never
  // passes through this endpoint, would let /mcp silence every CLI.
  describe('quota ordering', () => {
    // Both keys go through the same `incr` spy, so drive them by key.
    const counters = (perCaller: number, publicCount: number) =>
      incr.mockImplementation((key: string) =>
        Promise.resolve(key.includes(':public:') ? publicCount : perCaller)
      );

    // One counter, not two: the shared key is the CLI's whole ceiling now, so
    // a per-caller INCR appearing here would be a reintroduced identifier.
    it('charges only the shared key for a cli_command event', async () => {
      counters(1, 1);
      const { recordTelemetryEvent } = await loadRecord();

      const result = await recordTelemetryEvent(cliEvent);

      expect(result).toBe('recorded');
      expect(incr).toHaveBeenCalledTimes(1);
      expect(incr).toHaveBeenCalledWith(
        expect.stringContaining('telemetry:rl:public:')
      );
    });

    // Both sides, like the per-caller ceiling below: the README reasons about
    // this exact `>` edge, so tightening it to `>=` must fail a test.
    it('records the event landing exactly on the shared ceiling', async () => {
      counters(1, 50_000);
      const { recordTelemetryEvent } = await loadRecord();

      await expect(recordTelemetryEvent(cliEvent)).resolves.toBe('recorded');
    });

    it('returns "quota-exceeded" without writing once the shared budget is spent', async () => {
      counters(1, 50_001);
      const { recordTelemetryEvent } = await loadRecord();

      const result = await recordTelemetryEvent(cliEvent);

      expect(result).toBe('quota-exceeded');
      expect(xadd).not.toHaveBeenCalled();
    });

    // /mcp never passes through the public endpoint, so charging it there
    // would let MCP traffic starve the CLI's budget.
    it('never charges the shared budget for an MCP event', async () => {
      counters(1, 1);
      const { recordTelemetryEvent } = await loadRecord();

      const result = await recordTelemetryEvent(mcpEvent);

      expect(result).toBe('recorded');
      expect(incr).toHaveBeenCalledTimes(1);
      expect(incr).not.toHaveBeenCalledWith(
        expect.stringContaining('telemetry:rl:public:')
      );
    });
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

  // Hour-granular for the CLI only. Without an identifier, timing is the
  // remaining way to correlate two CLI events, so the resolution is the
  // control. MCP events keep full precision: they are already identified.
  describe('receivedAt granularity', () => {
    beforeEach(() => {
      incr.mockResolvedValue(1);
    });

    const written = () => JSON.parse(xadd.mock.calls[0][2].data).receivedAt;

    it('truncates a cli_command timestamp to the hour', async () => {
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(cliEvent);

      expect(written()).toMatch(/T\d{2}:00:00\.000Z$/);
    });

    it('keeps full precision on an mcp_tool_call timestamp', async () => {
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(mcpEvent);

      // Not the hour-truncated shape. A real run lands on :00:00.000 once in
      // 3.6M, so vi.setSystemTime would buy nothing but a second fake clock.
      expect(written()).not.toMatch(/T\d{2}:00:00\.000Z$/);
    });
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

  it('still drops mcp_tool_call events past their own ceiling, so a runaway loop is bounded', async () => {
    incr.mockResolvedValue(10_001);
    const { recordTelemetryEvent } = await loadRecord();

    await expect(recordTelemetryEvent(mcpEvent)).resolves.toBe('rate-limited');
  });

  it('logs the cause of a Redis failure once per process, not per call', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    incr.mockRejectedValue(new Error('upstash down'));
    const { recordTelemetryEvent } = await loadRecord();

    // MCP: its INCR failure propagates to the general handler. The CLI's only
    // INCR is the shared quota check, which catches its own failure and warns
    // under a different cause.
    await recordTelemetryEvent(mcpEvent);
    await recordTelemetryEvent(mcpEvent);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('upstash down');
    warn.mockRestore();
  });

  // Unbounded retention rests on this one — see ./README.md. Driven through
  // recordTelemetryEvent: the check is module-private, because calling it
  // spends the shared budget.
  describe('shared endpoint quota', () => {
    it('counts one fixed key per day, derived from no caller input', async () => {
      incr.mockResolvedValue(1);
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(cliEvent);

      expect(incr).toHaveBeenCalledWith(
        expect.stringMatching(/^telemetry:rl:public:\d{4}-\d{2}-\d{2}$/)
      );
    });

    it('gives the shared key a TTL, so it cannot outlive its day', async () => {
      incr.mockResolvedValue(1);
      const { recordTelemetryEvent } = await loadRecord();

      await recordTelemetryEvent(cliEvent);

      expect(expireMock).toHaveBeenCalledWith(
        expect.stringContaining('telemetry:rl:public:'),
        24 * 60 * 60,
        'NX'
      );
    });

    // Fails open: a check that could not run must not turn traffic away. Only
    // the shared key fails here, so this also pins that a blip isolated to it
    // is not reported as — or silenced by — a general Redis outage.
    it('still records the event when the shared check itself fails', async () => {
      incr.mockImplementation((key: string) =>
        key.includes(':public:')
          ? Promise.reject(new Error('upstash down'))
          : Promise.resolve(1)
      );
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { recordTelemetryEvent } = await loadRecord();

      await expect(recordTelemetryEvent(cliEvent)).resolves.toBe('recorded');
      expect(xadd).toHaveBeenCalled();
      expect(warn.mock.calls[0][0]).toContain('public quota check failed');
      warn.mockRestore();
    });
  });

  // The comment on bumpDailyCounter says a failing EXPIRE must not discard a
  // good INCR. Without keepErrors the default exec() throws on any command
  // error, so a blip on the TTL alone would drop the event.
  it('records the event even when only the EXPIRE fails', async () => {
    incr.mockResolvedValue(1);
    expireMock.mockRejectedValue(new Error('expire blew up'));
    const { recordTelemetryEvent } = await loadRecord();

    await expect(recordTelemetryEvent(cliEvent)).resolves.toBe('recorded');
    expect(xadd).toHaveBeenCalledTimes(1);
  });

  // `count > limit`, so the ceiling itself is still allowed. Pins the
  // comparison against an off-by-one to `>=`. MCP only: the sources no longer
  // share a ceiling, and the CLI's pair sits in `quota ordering` above,
  // against the shared 50000 rather than this per-caller 10000.
  it('records an mcp_tool_call event landing exactly on its ceiling', async () => {
    incr.mockResolvedValue(10_000);
    const { recordTelemetryEvent } = await loadRecord();

    await expect(recordTelemetryEvent(mcpEvent)).resolves.toBe('recorded');
  });

  it('rate-limits an mcp_tool_call event one past its ceiling', async () => {
    incr.mockResolvedValue(10_001);
    const { recordTelemetryEvent } = await loadRecord();

    await expect(recordTelemetryEvent(mcpEvent)).resolves.toBe('rate-limited');
  });

  // The defense-in-depth re-parse guards both halves of the union, but only the
  // MCP half was covered — that is the hand-built path, so it got the attention.
  // `anonymousId` is the case worth pinning on the CLI half: the schema is
  // strict, so the field the CLI stopped sending is rejected here too and not
  // just at the route.
  it('returns "invalid" for a cli_command event carrying an anonymousId', async () => {
    const { recordTelemetryEvent } = await loadRecord();
    const malformed = {
      ...cliEvent,
      anonymousId: '00000000-0000-4000-8000-000000000000',
    } as unknown as TelemetryEvent;

    await expect(recordTelemetryEvent(malformed)).resolves.toBe('invalid');
    expect(incr).not.toHaveBeenCalled();
  });
});
