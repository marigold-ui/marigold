import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TELEMETRY_COMMANDS } from './commands';
import { POST } from './route';

// Constructed once and reused across every mocked-Redis test below: getRedis()
// caches the client it constructs at module scope, so every call after the
// first one (across all tests in this file, once Redis is configured) returns
// this same instance regardless of which test's mockResolvedValue is "current"
// — beforeEach resets the spies themselves, not the cached client. Hoisted by
// vitest above the `./route` import above, so the mock is in place before
// route.ts's own `import { Redis } from '@upstash/redis'` resolves.
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

  // Derived from the route's own command enum so a command added there is
  // automatically covered here — no second hardcoded list to drift out of
  // sync with the schema (which itself mirrors the CLI's CommandName union in
  // packages/cli/src/lib/telemetry.ts).
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

  // The plain day key (telemetry:YYYY-MM-DD), as opposed to the differently-
  // shaped rate-limit key (telemetry:rl:<anonymousId>:YYYY-MM-DD) — route.ts
  // calls expire() on both, once per POST, so assertions on "the event list's
  // own expire call" must filter to this shape specifically.
  const dayKeyExpireCalls = () =>
    redisMock.expire.mock.calls.filter(([key]) =>
      /^telemetry:\d{4}-\d{2}-\d{2}$/.test(key as string)
    );

  it("expires the day's event list on its first event, so it doesn't retain data forever", async () => {
    // Regression: the daily event-storage key (telemetry:YYYY-MM-DD) used to
    // have no TTL at all — unlike the rate-limit key right next to it, which
    // always got one — so a new key accumulated every day, forever, with
    // nothing in the repo that ever reads or trims them.
    const res = await post(makeEvent('validate'));

    expect(res.status).toBe(204);
    expect(redisMock.lpush).toHaveBeenCalledTimes(1);
    const calls = dayKeyExpireCalls();
    expect(calls).toHaveLength(1);
    const [dayKey, ttlSeconds] = calls[0];
    expect(dayKey).toBe(redisMock.lpush.mock.calls.at(-1)![0]);
    expect(ttlSeconds).toBe(90 * 24 * 60 * 60);
  });

  it('does not re-expire the list on every subsequent event that same day', async () => {
    redisMock.lpush.mockResolvedValueOnce(1).mockResolvedValueOnce(2);

    await post(makeEvent('validate'));
    await post(makeEvent('validate'));

    expect(redisMock.lpush).toHaveBeenCalledTimes(2);
    expect(dayKeyExpireCalls()).toHaveLength(1); // only the first event's push
  });
});
