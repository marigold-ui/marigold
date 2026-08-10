import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TELEMETRY_COMMANDS } from './commands';
import { POST } from './route';

// Constructed once and reused: getRedis() caches its client at module scope,
// so every later call returns this same instance — beforeEach resets the spies,
// not the cached client. Hoisted by vitest above the `./route` import so the
// mock is in place before route.ts resolves '@upstash/redis'.
const redisMock = {
  incr: vi.fn(),
  expire: vi.fn(),
  lpush: vi.fn(),
};
vi.mock('@upstash/redis', () => ({
  // route.ts constructs this with `new Redis(...)` — an arrow function can't
  // be invoked as a constructor, so this needs a real function/class.
  Redis: vi.fn(function RedisMock() {
    return redisMock;
  }),
}));

// Build a valid telemetry event. The `command` field is the only thing each
// test varies; everything else is a known-good payload that satisfies
// EventSchema so we isolate the command-enum contract.
const makeEvent = (command: string) => ({
  event: 'cli_command',
  command,
  cliVersion: '1.0.0',
  nodeVersion: '24.0.0',
  platform: 'darwin',
  isTTY: true,
  isAIAgent: false,
  durationBucket: '0-100',
  exitCode: 0,
  anonymousId: '00000000-0000-4000-8000-000000000000',
});

const post = (body: unknown) =>
  POST(
    new Request('http://localhost/api/telemetry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  );

describe('POST /api/telemetry', () => {
  beforeEach(() => {
    // Redis is unconfigured in tests, so a valid event is accepted with 204
    // (the route returns 204 when getRedis() yields null). This lets us assert
    // schema acceptance without a backend.
    vi.stubEnv('KV_REST_API_URL', '');
    vi.stubEnv('KV_REST_API_TOKEN', '');
  });

  // Derived from the route's own command enum, so a command added there is
  // covered automatically and no second list can drift out of sync.
  it.each(TELEMETRY_COMMANDS)('accepts a %s command event', async command => {
    const res = await post(makeEvent(command));

    expect(res.status).not.toBe(400);
  });

  it('rejects an unknown command with 400', async () => {
    const res = await post(makeEvent('bogus'));

    expect(res.status).toBe(400);
  });
});

describe('POST /api/telemetry (with Redis configured)', () => {
  beforeEach(() => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.upstash.io');
    vi.stubEnv('KV_REST_API_TOKEN', 'test-token');
    vi.clearAllMocks();
    redisMock.incr.mockResolvedValue(1);
    redisMock.expire.mockResolvedValue(1);
    redisMock.lpush.mockResolvedValue(1);
  });

  // The plain day key, not the rate-limit key (telemetry:rl:<id>:date).
  // route.ts expires both per POST, so assertions must filter to this shape.
  const dayKeyExpireCalls = () =>
    redisMock.expire.mock.calls.filter(([key]) =>
      /^telemetry:\d{4}-\d{2}-\d{2}$/.test(key as string)
    );

  it("expires the day's event list on its first event, so it doesn't retain data forever", async () => {
    const res = await post(makeEvent('validate'));

    expect(res.status).toBe(204);
    expect(redisMock.lpush).toHaveBeenCalledTimes(1);
    const calls = dayKeyExpireCalls();
    expect(calls).toHaveLength(1);
    const [dayKey, ttlSeconds, option] = calls[0];
    expect(dayKey).toBe(redisMock.lpush.mock.calls.at(-1)![0]);
    expect(ttlSeconds).toBe(90 * 24 * 60 * 60);
    expect(option).toBe('NX');
  });

  it('calls EXPIRE NX on every event, not just the first, so a failed first-event EXPIRE is retried', async () => {
    // NX makes this idempotent server-side, so calling it unconditionally
    // never extends the retention window, and a first-event EXPIRE lost to a
    // network blip is retried by every later event.
    redisMock.lpush.mockResolvedValueOnce(1).mockResolvedValueOnce(2);

    await post(makeEvent('validate'));
    await post(makeEvent('validate'));

    expect(redisMock.lpush).toHaveBeenCalledTimes(2);
    expect(dayKeyExpireCalls()).toHaveLength(2);
  });

  it('resolves the event key once, so an event straddling midnight UTC still gets a TTL', async () => {
    // Resolving the key twice lets a request crossing midnight LPUSH onto day
    // N and EXPIRE day N+1, which doesn't exist yet — a silent no-op leaving
    // day N with no TTL, and no later event ever targets that key again.
    // Simulated by advancing the clock during the LPUSH call.
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-01-01T23:59:59.500Z'));
      redisMock.lpush.mockImplementationOnce(async () => {
        vi.setSystemTime(new Date('2026-01-02T00:00:00.500Z'));
        return 1;
      });

      const res = await post(makeEvent('validate'));

      expect(res.status).toBe(204);
      const pushedKey = redisMock.lpush.mock.calls.at(-1)![0];
      expect(pushedKey).toBe('telemetry:2026-01-01');
      const calls = dayKeyExpireCalls();
      expect(calls).toHaveLength(1);
      // The TTL has to land on the key that was actually written to.
      expect(calls[0][0]).toBe(pushedKey);
    } finally {
      vi.useRealTimers();
    }
  });
});
