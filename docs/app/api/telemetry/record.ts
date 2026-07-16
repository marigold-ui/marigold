import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-caller daily quota. Telemetry is fire-and-forget from every caller
// (CLI process, MCP tool call), so the legit upper bound is "one event per
// invocation"; 1000/day leaves ample headroom for power users (CI is
// auto-suppressed on the CLI side) while still bounding abuse on the public
// POST endpoint to a knowable share of the Upstash quota.
const RATE_LIMIT_PER_DAY = 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;

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
    // Per-caller daily quota. INCR returns the new count atomically; EXPIRE
    // only on first hit so the TTL doesn't get pushed out forever.
    const rlKey = rateLimitKey(rateLimitIdOf(event));
    const count = await client.incr(rlKey);
    if (count === 1) await client.expire(rlKey, SECONDS_PER_DAY);
    if (count > RATE_LIMIT_PER_DAY) {
      return 'rate-limited';
    }

    const payload = {
      ...event,
      receivedAt: new Date().toISOString(),
    };
    await client.lpush(dateKey(), JSON.stringify(payload));
    return 'recorded';
  } catch {
    // Never leak backend errors; telemetry must not break the caller.
    return 'error';
  }
}
