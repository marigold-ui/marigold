import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Ceilings, keyspace and the retention decision: see ./README.md
const RATE_LIMIT_PER_DAY = { cli_command: 1_000, mcp_tool_call: 10_000 };
const SECONDS_PER_DAY = 24 * 60 * 60;

const PUBLIC_LIMIT_PER_DAY = 50_000;

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

// keepErrors: a failing EXPIRE must not discard a good INCR.
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

export type RecordResult =
  'recorded' | 'unconfigured' | 'rate-limited' | 'invalid' | 'error';

export async function recordTelemetryEvent(
  event: TelemetryEvent
): Promise<RecordResult> {
  const parsed = EventSchema.safeParse(event);
  if (!parsed.success) {
    return 'invalid';
  }

  try {
    // getRedis() is inside the try: `new Redis()` throws on a malformed URL, and
    // neither caller can absorb a rejection.
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
    warnOnce('redis', `[telemetry] Redis call failed: ${err}`);
    return 'error';
  }
}

// 'unavailable' must be let through by callers — see ./README.md
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
