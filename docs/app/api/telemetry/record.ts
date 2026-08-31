import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-caller daily quota, per source. A caller past it is dropped rather than
// truncated, so both ceilings sit far above realistic per-day usage.
//
// The two differ because the threat differs. CLI events arrive over an
// unauthenticated endpoint, so 1000 is an abuse bound. MCP events arrive
// in-process with an id from a verified JWT — there is no abuse to bound, and
// dropping them under-reports the very call volume this feature exists to
// measure, so the ceiling is 10x. It isn't removed outright because nothing
// expires any more: a runaway agent loop is a trusted caller that can still
// write without limit, and this is the only thing left standing in its way.
const RATE_LIMIT_PER_DAY = { cli_command: 1_000, mcp_tool_call: 10_000 };
const SECONDS_PER_DAY = 24 * 60 * 60;

// Second quota for the public endpoint, keyed on something the caller does not
// choose. The per-caller key above comes out of the request body, so rotating
// `anonymousId` walks straight past it — which stopped being self-correcting
// when the stream lost its TTL. Generous because a whole team can share one
// NAT egress address: 20k/day is ~20 power users at their own 1000 ceiling.
const IP_LIMIT_PER_DAY = 20_000;

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

// Separate from the MCP route's own warnOnce: that one tracks emission
// failures, this one tracks the Redis call. Different causes, so they must
// dedupe independently or one would silence the other.
const warned = new Set<string>();
const warnOnce = (cause: string, message: string): void => {
  if (warned.has(cause)) return;
  warned.add(cause);
  console.warn(message);
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
    if (count > RATE_LIMIT_PER_DAY[parsed.data.event]) {
      return 'rate-limited';
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };
    // No trim option — see the retention note above.
    await client.xadd(STREAM_KEY, '*', { data: JSON.stringify(payload) });
    return 'recorded';
  } catch (err) {
    // Never leak backend errors to the caller — but don't swallow the cause
    // either, or a Redis outage looks identical to "nobody used it". Once per
    // process: an outage breaks every call the same way, so per-call logging
    // would bury the signal it is meant to provide.
    warnOnce('redis', `[telemetry] Redis call failed: ${err}`);
    return 'error';
  }
}

// Bump the public endpoint's per-IP counter. Separate from the per-caller
// quota above because only this one is a defence: it keys on an address the
// caller can't pick. 'unavailable' means the check couldn't run (no address,
// no Redis, or the call failed) and the caller should let the request through
// — telemetry must not start rejecting traffic because Redis is down.
export type IpQuotaResult = 'ok' | 'exceeded' | 'unavailable';

export async function consumePublicIpQuota(
  ip: string | null
): Promise<IpQuotaResult> {
  if (!ip) return 'unavailable';

  try {
    const client = getRedis();
    if (!client) return 'unavailable';

    const key = `telemetry:rl:ip:${ip}:${utcDate()}`;
    const count = await client.incr(key);
    await client.expire(key, SECONDS_PER_DAY, 'NX');
    return count > IP_LIMIT_PER_DAY ? 'exceeded' : 'ok';
  } catch {
    return 'unavailable';
  }
}
