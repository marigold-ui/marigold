import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-source daily ceilings; a caller past one is dropped, not truncated. CLI
// events arrive over an unauthenticated endpoint, so 1000 bounds abuse. MCP ids
// come from a verified JWT, so 10k only guards a looping agent — but it can't
// be removed, because nothing expires to clean up after one.
const RATE_LIMIT_PER_DAY = { cli_command: 1_000, mcp_tool_call: 10_000 };
const SECONDS_PER_DAY = 24 * 60 * 60;

// One ceiling for the whole public endpoint, on a single fixed key. The
// per-caller quota above keys on the request body's own `anonymousId`, so
// rotating that walks past it — and `POST /api/telemetry` has to stay
// unauthenticated, because @marigold/cli is a public npm package.
//
// Deliberately not keyed per client address: that key would come from a header,
// which is caller-supplied unless a proxy overwrites it, so it bounds nothing
// on its own — and it would put IP addresses in Redis, which is personal data
// this system otherwise goes out of its way to avoid holding.
//
// A backstop, not a fairness device: far above any plausible legitimate day,
// low enough that sustained abuse stays a knowable cost. ADR-0006 depends on
// it, since it is the only hard bound on a store that never expires.
const PUBLIC_LIMIT_PER_DAY = 50_000;

// Ids are `<epochMillis>-<seq>`, so any window is one XRANGE. Never trimmed —
// see .memory/adr/0006-telemetry-retention.md.
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

const warned = new Set<string>();
const warnOnce = (cause: string, message: string): void => {
  if (warned.has(cause)) return;
  warned.add(cause);
  console.warn(message);
};

// One round trip: the EXPIRE doesn't depend on the INCR's result, and this
// store bills per command. NX sets a TTL only when there isn't one, so issuing
// it every hit is idempotent and a first-hit EXPIRE lost to a blip is retried.
//
// keepErrors so a failing EXPIRE can't discard a good INCR — the default throws
// if any queued command errored, which would drop the event over a fault on the
// TTL command alone. Only the counter is load-bearing here.
const bumpDailyCounter = async (
  client: Redis,
  key: string
): Promise<number> => {
  const [counter] = await client
    .pipeline()
    .incr(key)
    .expire(key, SECONDS_PER_DAY, 'NX')
    .exec({ keepErrors: true });

  if (counter.error !== undefined || counter.result === undefined) {
    throw new Error(counter.error ?? 'INCR returned no result');
  }
  return counter.result;
};

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
  // The MCP route hand-builds its event, satisfying TelemetryEvent at compile
  // time but not Zod's runtime constraints. Parsing also strips unknown keys.
  const parsed = EventSchema.safeParse(event);
  if (!parsed.success) {
    return 'invalid';
  }

  try {
    // Inside the try: `new Redis()` throws synchronously on a malformed URL,
    // and neither caller can absorb a rejection — the CLI route would 500
    // where it promises 204, the MCP route's call runs past its own try.
    const client = getRedis();
    if (!client) {
      return 'unconfigured';
    }

    const rlKey = rateLimitKey(rateLimitIdOf(parsed.data));
    const count = await bumpDailyCounter(client, rlKey);
    if (count > RATE_LIMIT_PER_DAY[parsed.data.event]) {
      return 'rate-limited';
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };
    await client.xadd(STREAM_KEY, '*', { data: JSON.stringify(payload) });
    return 'recorded';
  } catch (err) {
    // Don't leak the error, but don't lose the cause either — an outage would
    // otherwise look identical to "nobody used it". Once per process.
    warnOnce('redis', `[telemetry] Redis call failed: ${err}`);
    return 'error';
  }
}

// 'unavailable' means the check couldn't run (no Redis, or the call failed).
// Callers must let those through: telemetry cannot start rejecting traffic
// because Redis is down.
export type PublicQuotaResult = 'ok' | 'exceeded' | 'unavailable';

export async function consumePublicQuota(): Promise<PublicQuotaResult> {
  try {
    const client = getRedis();
    if (!client) return 'unavailable';

    const count = await bumpDailyCounter(
      client,
      `telemetry:rl:public:${utcDate()}`
    );
    return count > PUBLIC_LIMIT_PER_DAY ? 'exceeded' : 'ok';
  } catch {
    return 'unavailable';
  }
}
