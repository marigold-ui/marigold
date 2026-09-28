import { createWarnOnce } from '@/lib/warn-once';
import { Redis } from '@upstash/redis';
import {
  EventSchema,
  type McpToolCallEvent,
  type TelemetryEvent,
} from './schema';

// Ceilings, keyspace and the retention decision: see ./README.md
// Per-caller, MCP only.
const RATE_LIMIT_PER_DAY = 10_000;

const SECONDS_PER_DAY = 24 * 60 * 60;
// Endpoint-wide, and since the CLI went identifier-free this is the CLI's only
// ceiling rather than a backstop behind a per-caller one.
const PUBLIC_LIMIT_PER_DAY = 50_000;

// One stream per source. Insights reads MCP events from `telemetry:events`, so
// that key stays where it is.
const MCP_STREAM_KEY = 'telemetry:events';
const CLI_STREAM_KEY = 'telemetry:cli';

const MS_PER_HOUR = 60 * 60 * 1000;

const utcDate = (): string => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// MCP only. `cli_command` has no identifier to key on: the CLI stopped sending
// `anonymousId` because a persistent per-machine UUID is pseudonymous rather
// than anonymous (see packages/cli/src/lib/config.ts), and there is nothing
// left in the payload that survives across two runs of the same CLI. Its only
// ceiling is the endpoint-wide one.
const mcpRateLimitKey = (event: McpToolCallEvent): string =>
  `telemetry:rl:mcp:${event.hashedCallerId}:${utcDate()}`;

// Full precision for MCP, hour-granular for the CLI. A `cli_command` event
// carries no identifier, and an exact timestamp would hand back most of what
// removing it bought: events could be stitched into a per-session sequence by
// timing alone. An MCP event is already tied to a hashed caller, so coarse
// timestamps would protect nothing there while costing Insights the resolution
// it reads these for.
//
// Rounding `receivedAt` alone is not enough, because the entry id is a
// timestamp too: with `*`, Redis stamps `<epochMillis>-<seq>`. So a CLI entry
// is written under `<hourMs>-*`, which pins the millisecond part to the hour
// and leaves Redis to fill in only the sequence number. That needs a stream of
// its own. Ids must increase, so a shared stream would reject an hour-stamped
// id as soon as a later MCP event had been written in that hour, and MCP
// entries on either side of a CLI one would bound its time anyway.
//
// What survives is the order of CLI events within an hour, through `<seq>`.
// And if one instance's clock lags another's across an hour boundary, its
// write lands below the stream's top id and Redis rejects it. That event is
// dropped as an 'error'. Retrying with `*` would be the precise timestamp this
// exists to avoid.
const streamEntry = (
  event: TelemetryEvent['event'],
  now: number
): { key: string; id: string; receivedAt: string } => {
  if (event === 'cli_command') {
    const hourMs = now - (now % MS_PER_HOUR);
    return {
      key: CLI_STREAM_KEY,
      id: `${hourMs}-*`,
      receivedAt: new Date(hourMs).toISOString(),
    };
  }
  return {
    key: MCP_STREAM_KEY,
    id: '*',
    receivedAt: new Date(now).toISOString(),
  };
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
  | 'recorded'
  | 'unconfigured'
  | 'rate-limited'
  | 'quota-exceeded'
  | 'invalid'
  | 'error';

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

    // One ceiling per source, keyed by whatever identifier that source
    // legitimately has. /mcp is Keycloak-gated and carries a hashed subject, so
    // it can be bounded per caller and never charges the shared budget, which
    // would otherwise let MCP traffic starve the CLI's. The CLI is anonymous by
    // design, so the endpoint as a whole is the only thing left to bound.
    if (parsed.data.event === 'mcp_tool_call') {
      const count = await bumpDailyCounter(
        client,
        mcpRateLimitKey(parsed.data)
      );
      if (count > RATE_LIMIT_PER_DAY) {
        return 'rate-limited';
      }
    } else if (await publicQuotaExceeded(client)) {
      return 'quota-exceeded';
    }

    const { key, id, receivedAt } = streamEntry(parsed.data.event, Date.now());
    const payload = { ...parsed.data, receivedAt };
    await client.xadd(key, id, { data: JSON.stringify(payload) });
    return 'recorded';
  } catch (err) {
    warnOnce('redis', `[telemetry] Redis call failed: ${err}`);
    return 'error';
  }
}

// True means over the ceiling. Bumps the counter, so calling it costs quota —
// module-private for exactly that reason. False when the check could not run: a
// Redis outage fails open — see ./README.md
async function publicQuotaExceeded(client: Redis): Promise<boolean> {
  try {
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
