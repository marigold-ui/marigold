import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-caller daily quota. A caller past it is dropped rather than truncated,
// so the ceiling sits far above realistic per-day usage for either source.
const RATE_LIMIT_PER_DAY = 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;

// One stream, not one list per UTC day: ids are `<epochMillis>-<seq>`, so any
// window is a single XRANGE instead of one LRANGE per day. Deliberately never
// trimmed — see .memory/adr/0006-telemetry-retention.md.
const STREAM_KEY = 'telemetry:events';

const utcDate = (): string => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

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

// 'invalid' (the event failed validation — a bug here) is kept distinct from
// 'error' (the Redis call failed — an outage); the MCP route logs the cause.
export type RecordResult =
  'recorded' | 'unconfigured' | 'rate-limited' | 'invalid' | 'error';

export async function recordTelemetryEvent(
  event: TelemetryEvent
): Promise<RecordResult> {
  // The MCP route hand-builds its event and only satisfies TelemetryEvent at
  // compile time, not Zod's runtime constraints. Parsing here also strips
  // unknown keys on that path, not just the HTTP one.
  const parsed = EventSchema.safeParse(event);
  if (!parsed.success) {
    return 'invalid';
  }

  try {
    // Inside the try: `new Redis()` throws synchronously on a URL that fails
    // its own regex (a trailing newline in the env var is enough), and this
    // function must resolve to a RecordResult rather than reject. Its callers
    // can't absorb a rejection — the CLI route would 500 where it promises a
    // silent 204, and the MCP route's runs in an after() callback, past the
    // try that would have logged it.
    const client = getRedis();
    if (!client) {
      // Telemetry not configured — accept silently to avoid retries from CLI.
      return 'unconfigured';
    }

    // NX sets the TTL only when there isn't one, so calling EXPIRE on every
    // hit is idempotent — and a first-hit EXPIRE lost to a blip gets retried,
    // where a `count === 1` gate would leave the key TTL-less all day.
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
    // No trim option — see the retention note above.
    await client.xadd(STREAM_KEY, '*', { data: JSON.stringify(payload) });
    return 'recorded';
  } catch {
    // Never leak backend errors; telemetry must not break the caller.
    return 'error';
  }
}
