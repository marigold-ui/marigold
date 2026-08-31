import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-caller daily quota. On the public POST endpoint it bounds abuse; for
// in-process MCP events, where the caller id is derived from a verified JWT and
// can't be forged, it only caps how much one caller can add to the stream.
// A caller past the quota is dropped rather than truncated, so the ceiling is
// deliberately far above realistic per-day usage for either source.
const RATE_LIMIT_PER_DAY = 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;

// Events go into one stream rather than one list per UTC day. Stream ids are
// `<epochMillis>-<seq>`, so a reader covers any time window with a single
// XRANGE; the per-day layout cost it one LRANGE per day in the window (180 for
// Insights' 90-day view, which compares against the preceding 90 days).
// Retention also stops being per-key bookkeeping: MINID trimming rides along on
// the same XADD, so there is no separate EXPIRE to land on the right day key
// and no way for one to be missed.
const STREAM_KEY = 'telemetry:events';
const RETENTION_DAYS = 200;

const utcDate = (): string => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Prefixed per event source so the rate-limit keyspace stays greppable by
// caller type.
const rateLimitIdOf = (event: TelemetryEvent): string =>
  event.event === 'cli_command'
    ? `cli:${event.anonymousId}`
    : `mcp:${event.hashedCallerId}`;

const rateLimitKey = (id: string): string => `telemetry:rl:${id}:${utcDate()}`;

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
  'recorded' | 'unconfigured' | 'rate-limited' | 'invalid' | 'error';

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
    // Per-caller daily quota. INCR returns the new count atomically.
    // EXPIRE with NX sets the TTL only if the key doesn't already have one —
    // idempotent, so a failed EXPIRE on the first hit (a network blip) is
    // retried by every later call, unlike a `count === 1` gate where that
    // failure would go unnoticed and unretried for the rest of the day,
    // leaving the key with no TTL at all.
    const rlKey = rateLimitKey(rateLimitIdOf(parsed.data));
    const count = await client.incr(rlKey);
    await client.expire(rlKey, SECONDS_PER_DAY, 'NX');
    if (count > RATE_LIMIT_PER_DAY) {
      return 'rate-limited';
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };
    // Append and trim in one command. `~` lets Redis trim by whole nodes, which
    // is cheap; the exact cutoff doesn't matter as long as it stays well past
    // what any reader asks for.
    await client.xadd(
      STREAM_KEY,
      '*',
      { data: JSON.stringify(payload) },
      {
        trim: {
          type: 'MINID',
          comparison: '~',
          threshold: String(
            Date.now() - RETENTION_DAYS * SECONDS_PER_DAY * 1000
          ),
        },
      }
    );
    return 'recorded';
  } catch {
    // Never leak backend errors; telemetry must not break the caller.
    return 'error';
  }
}
