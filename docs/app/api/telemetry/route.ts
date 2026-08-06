import { Redis } from '@upstash/redis';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { TELEMETRY_COMMANDS } from './commands';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EventSchema = z.object({
  event: z.literal('cli_command'),
  command: z.enum(TELEMETRY_COMMANDS),
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
// Per-anonymousId daily quota. The legitimate upper bound is one event per
// command invocation, so 1000/day leaves headroom for power users (CI is
// auto-suppressed) while bounding abuse of the public endpoint.
const RATE_LIMIT_PER_DAY = 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;
// How long a day's raw event list is retained before Redis expires it.
// Without this, `telemetry:YYYY-MM-DD` keys accumulate forever — one new key
// every day, none of them ever read back out by anything in this repo — an
// unbounded storage leak against the Upstash quota. 90 days is generous for
// whatever aggregation job eventually reads these, while still bounding
// growth to a known number of days' worth of events.
const EVENT_RETENTION_SECONDS = 90 * SECONDS_PER_DAY;

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
    // Per-anonymousId daily quota. INCR returns the new count atomically.
    // EXPIRE with NX sets the TTL only if the key doesn't already have
    // one — idempotent, so a failed EXPIRE on the first hit (a network
    // blip) is retried by every later call, unlike a `count === 1` gate
    // where that failure would go unnoticed and unretried for the rest of
    // the day, leaving the key with no TTL at all.
    const rlKey = rateLimitKey(parsed.data.anonymousId);
    const count = await client.incr(rlKey);
    await client.expire(rlKey, SECONDS_PER_DAY, 'NX');
    if (count > RATE_LIMIT_PER_DAY) {
      return new NextResponse(null, { status: 429 });
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };
    // Same NX idempotency as the rate-limit key above: retried by every
    // later event in the day if the first EXPIRE call fails, and never
    // pushes the retention window out regardless of how many times it runs.
    // The key is resolved once: calling dateKey() twice lets a request that
    // crosses midnight UTC between the two commands push onto day N and then
    // EXPIRE day N+1 — a key that doesn't exist yet, so EXPIRE is a no-op and
    // day N's list is left with no TTL at all. No later event targets that key
    // again, so NX can't recover it.
    const eventKey = dateKey();
    await client.lpush(eventKey, JSON.stringify(payload));
    await client.expire(eventKey, EVENT_RETENTION_SECONDS, 'NX');
  } catch {
    // Never leak backend errors; telemetry must not break the caller.
  }

  return new NextResponse(null, { status: 204 });
}
