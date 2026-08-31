import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Per-source daily ceilings; a caller past one is dropped, not truncated. CLI
// events arrive over an unauthenticated endpoint, so 1000 bounds abuse. MCP ids
// come from a verified JWT, so 10k only guards a looping agent — but it can't
// be removed, because nothing expires to clean up after one.
const RATE_LIMIT_PER_DAY = { cli_command: 1_000, mcp_tool_call: 10_000 };
const SECONDS_PER_DAY = 24 * 60 * 60;

// Second quota for the public endpoint, keyed on an address the caller can't
// pick: the ceiling above keys on the request body's own `anonymousId`, which
// rotating walks past. Generous because a team can share one NAT address.
const IP_LIMIT_PER_DAY = 20_000;

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

    // NX sets a TTL only when there isn't one, so an unconditional EXPIRE is
    // idempotent and a first-hit EXPIRE lost to a blip still gets retried.
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
    await client.xadd(STREAM_KEY, '*', { data: JSON.stringify(payload) });
    return 'recorded';
  } catch (err) {
    // Don't leak the error, but don't lose the cause either — an outage would
    // otherwise look identical to "nobody used it". Once per process.
    warnOnce('redis', `[telemetry] Redis call failed: ${err}`);
    return 'error';
  }
}

// 'unavailable' means the check couldn't run (no address, no Redis, or the
// call failed). Callers must let those through: telemetry cannot start
// rejecting traffic because Redis is down.
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
