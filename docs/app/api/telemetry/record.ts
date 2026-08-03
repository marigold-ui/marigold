import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-caller daily quota. On the public POST endpoint it bounds abuse; for
// in-process MCP events, where the caller id is derived from a verified JWT and
// can't be forged, it only caps how much one caller can add to the daily list.
// A caller past the quota is dropped rather than truncated, so the ceiling is
// deliberately far above realistic per-day usage for either source.
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
// caller type.
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

// 'invalid' (our event failed validation — a code bug) is kept distinct from
// 'error' (the Redis call failed — an outage). Both are dead ends for the
// event, but they call for completely different responses, and the MCP route
// logs the cause.
export type RecordResult =
  | 'recorded'
  | 'unconfigured'
  | 'rate-limited'
  | 'invalid'
  | 'error';

export async function recordTelemetryEvent(
  event: TelemetryEvent
): Promise<RecordResult> {
  // Defense-in-depth: an in-process caller (the MCP route) builds its event
  // by hand and only satisfies TelemetryEvent at compile time, not Zod's
  // runtime constraints. The parsed output is what gets persisted, so unknown
  // keys are stripped on this path too, not just the HTTP one.
  const parsed = EventSchema.safeParse(event);
  if (!parsed.success) {
    return 'invalid';
  }

  const client = getRedis();
  if (!client) {
    // Telemetry not configured — accept silently to avoid retries from CLI.
    return 'unconfigured';
  }

  try {
    // Per-caller daily quota. INCR returns the new count atomically; EXPIRE
    // only on first hit so the TTL doesn't get pushed out forever.
    const rlKey = rateLimitKey(rateLimitIdOf(parsed.data));
    const count = await client.incr(rlKey);
    if (count === 1) await client.expire(rlKey, SECONDS_PER_DAY);
    if (count > RATE_LIMIT_PER_DAY) {
      return 'rate-limited';
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };
    await client.lpush(dateKey(), JSON.stringify(payload));
    return 'recorded';
  } catch {
    // Never leak backend errors; telemetry must not break the caller.
    return 'error';
  }
}
