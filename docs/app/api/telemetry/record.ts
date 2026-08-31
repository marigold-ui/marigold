import { createWarnOnce } from '@/lib/warn-once';
import { Redis } from '@upstash/redis';
import { EventSchema, type TelemetryEvent } from './schema';

// Ceilings, keyspace and the retention decision: see ./README.md
const LIMITS: Record<TelemetryEvent['event'], number> = {
  cli_command: 1_000,
  mcp_tool_call: 10_000,
};

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

const rateLimitKey = (event: TelemetryEvent): string => {
  const id =
    event.event === 'cli_command'
      ? `cli:${event.anonymousId}`
      : `mcp:${event.hashedCallerId}`;
  return `telemetry:rl:${id}:${utcDate()}`;
};

const warnOnce = createWarnOnce();

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

    const count = await bumpDailyCounter(client, rateLimitKey(parsed.data));
    if (count > LIMITS[parsed.data.event]) {
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

// Bumps the counter, so it costs quota. False whenever the check could not run,
// so a Redis outage fails open rather than turning traffic away — see ./README.md
export async function consumePublicQuota(): Promise<boolean> {
  try {
    const client = getRedis();
    if (!client) return false;

    const count = await bumpDailyCounter(
      client,
      `telemetry:rl:public:${utcDate()}`
    );
    return count > PUBLIC_LIMIT_PER_DAY;
  } catch (err) {
    // Distinct cause from the write path's, so a failure isolated to this key
    // isn't reported as — or silenced by — a general Redis outage.
    warnOnce('public-quota', `[telemetry] public quota check failed: ${err}`);
    return false;
  }
}
