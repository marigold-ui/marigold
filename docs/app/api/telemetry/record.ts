import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-caller daily quota. Telemetry is fire-and-forget from every caller
// (CLI process, MCP tool call), so the legit upper bound is "one event per
// invocation"; 1000/day leaves ample headroom for power users (CI is
// auto-suppressed on the CLI side) while still bounding abuse on the public
// POST endpoint to a knowable share of the Upstash quota.
const RATE_LIMIT_PER_DAY = 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;
// How long a day's raw event list is retained before Redis expires it.
// Without this, `telemetry:YYYY-MM-DD` keys accumulate forever — one new key
// every day, none of them ever read back out by anything in this repo — an
// unbounded storage leak against the Upstash quota.
const EVENT_RETENTION_SECONDS = 90 * SECONDS_PER_DAY;

const dateKey = (): string => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `telemetry:${y}-${m}-${d}`;
};

// Prefixed per event source so the rate-limit keyspace stays greppable by
// caller type. Not load-bearing for correctness — a CLI anonymousId (36-char
// UUID) and an MCP hashedCallerId (64-char hex digest) can never collide as
// strings — but cheap insurance against either format changing later.
const rateLimitIdOf = (event: TelemetryEvent): string =>
  event.event === 'cli_command'
    ? `cli:${event.anonymousId}`
    : `mcp:${event.hashedCallerId}`;

const rateLimitKey = (id: string): string =>
  `telemetry:rl:${id}:${dateKey().slice('telemetry:'.length)}`;

let redis: Redis | null = null;
const getRedis = (): Redis | null => {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
};

export type RecordResult =
  | 'recorded'
  | 'unconfigured'
  | 'rate-limited'
  | 'error';

export async function recordTelemetryEvent(
  event: TelemetryEvent
): Promise<RecordResult> {
  // Defense-in-depth: the HTTP route already validates via EventSchema
  // before calling this, but an in-process caller (the MCP route) builds its
  // event by hand and only satisfies TelemetryEvent at compile time — a
  // future narrowed constraint in schema.ts (e.g. a shorter .max()) wouldn't
  // be caught by TypeScript. Re-validating here means every caller gets the
  // same runtime guarantee, not just the HTTP one.
  if (!EventSchema.safeParse(event).success) {
    return 'error';
  }

  const client = getRedis();
  if (!client) {
    // Telemetry not configured — accept silently to avoid retries from CLI.
    return 'unconfigured';
  }

  try {
    // Per-caller daily quota. INCR returns the new count atomically.
    // EXPIRE with NX sets the TTL only if the key doesn't already have one —
    // idempotent, so a failed EXPIRE on the first hit (a network blip) is
    // retried by every later call, unlike a `count === 1` gate where that
    // failure would go unnoticed and unretried for the rest of the day,
    // leaving the key with no TTL at all.
    const rlKey = rateLimitKey(rateLimitIdOf(event));
    const count = await client.incr(rlKey);
    await client.expire(rlKey, SECONDS_PER_DAY, 'NX');
    if (count > RATE_LIMIT_PER_DAY) {
      return 'rate-limited';
    }

    const payload = {
      ...event,
      receivedAt: new Date().toISOString(),
    };
    // Same NX idempotency as the rate-limit key above. The key is resolved
    // once: calling dateKey() twice lets a request that crosses midnight UTC
    // between the two commands push onto day N and then EXPIRE day N+1 — a key
    // that doesn't exist yet, so EXPIRE is a no-op and day N's list is left
    // with no TTL at all. No later event targets that key again, so NX can't
    // recover it.
    const eventKey = dateKey();
    await client.lpush(eventKey, JSON.stringify(payload));
    await client.expire(eventKey, EVENT_RETENTION_SECONDS, 'NX');
    return 'recorded';
  } catch {
    // Never leak backend errors; telemetry must not break the caller.
    return 'error';
  }
}
