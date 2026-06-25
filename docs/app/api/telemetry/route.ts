import { Redis } from '@upstash/redis';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EventSchema = z.object({
  event: z.literal('cli_command'),
  command: z.enum(['docs', 'list', 'search', 'examples', 'init', 'telemetry']),
  cliVersion: z.string().max(32),
  nodeVersion: z.string().max(32),
  platform: z.string().max(32),
  isTTY: z.boolean(),
  isAIAgent: z.boolean(),
  durationBucket: z.enum(['0-100', '100-500', '500-2000', '2000+']),
  exitCode: z.number().int().min(-1).max(255),
  cacheHit: z.boolean().optional(),
  args: z.record(z.string(), z.string().max(64)).optional(),
  anonymousId: z.string().uuid(),
});

const MAX_BODY_BYTES = 4 * 1024;
// Per-anonymousId daily quota. Telemetry is fire-and-forget from the CLI, so
// the legit upper bound is "one event per command invocation"; 1000/day leaves
// ample headroom for power users (CI is auto-suppressed) while still bounding
// abuse on the public POST endpoint to a knowable share of the Upstash quota.
const RATE_LIMIT_PER_DAY = 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;

const dateKey = (): string => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `telemetry:${y}-${m}-${d}`;
};

const rateLimitKey = (anonymousId: string): string =>
  `telemetry:rl:${anonymousId}:${dateKey().slice('telemetry:'.length)}`;

let redis: Redis | null = null;
const getRedis = (): Redis | null => {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid event' }, { status: 400 });
  }

  const client = getRedis();
  if (!client) {
    // Telemetry not configured — accept silently to avoid retries from CLI.
    return new NextResponse(null, { status: 204 });
  }

  try {
    // Per-anonymousId daily quota. INCR returns the new count atomically;
    // EXPIRE only on first hit so the TTL doesn't get pushed out forever.
    const rlKey = rateLimitKey(parsed.data.anonymousId);
    const count = await client.incr(rlKey);
    if (count === 1) await client.expire(rlKey, SECONDS_PER_DAY);
    if (count > RATE_LIMIT_PER_DAY) {
      return new NextResponse(null, { status: 429 });
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };
    await client.lpush(dateKey(), JSON.stringify(payload));
  } catch {
    // Never leak backend errors; telemetry must not break the caller.
  }

  return new NextResponse(null, { status: 204 });
}
