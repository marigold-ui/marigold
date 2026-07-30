import { Redis } from '@upstash/redis';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { TELEMETRY_COMMANDS } from './commands';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Strict: an unknown key fails the parse instead of being stripped. The point
// is that a client identifier (or anything else not listed here) can never be
// accepted quietly — a stale CLI sending `anonymousId` gets a 400, which is
// visible, rather than having the field dropped in silence.
const EventSchema = z.strictObject({
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
});

const MAX_BODY_BYTES = 4 * 1024;
const SECONDS_PER_DAY = 24 * 60 * 60;
// How long a day's raw event list is retained before Redis expires it.
// Without this, `telemetry:YYYY-MM-DD` keys accumulate forever — one new key
// every day, none of them ever read back out by anything in this repo — an
// unbounded storage leak against the Upstash quota. 90 days is generous for
// whatever aggregation job eventually reads these, while still bounding
// growth to a known number of days' worth of events.
const EVENT_RETENTION_SECONDS = 90 * SECONDS_PER_DAY;

// Global daily cap, replacing the former per-anonymousId quota — there is no
// per-client identifier to key on any more, by design. This is a cost backstop
// on the Upstash quota, not a security control: a determined abuser can exhaust
// the day's budget and suppress collection. That is an acceptable failure mode
// for telemetry (no user-facing feature degrades) and the right place to stop
// them is Vercel WAF rate limiting in front of this route, which needs no
// client identifier here.
const GLOBAL_EVENTS_PER_DAY = 500_000;

const dateKey = (): string => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `telemetry:${y}-${m}-${d}`;
};

const globalRateLimitKey = (): string =>
  `telemetry:rl:global:${dateKey().slice('telemetry:'.length)}`;

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
    // Global daily quota, replacing the former per-anonymousId one — there is
    // no client identifier left to key on. INCR returns the new count
    // atomically. EXPIRE with NX sets the TTL only if the key doesn't already
    // have one — idempotent, so a failed EXPIRE on the first hit (a network
    // blip) is retried by every later call, unlike a `count === 1` gate where
    // that failure would go unnoticed and unretried for the rest of the day,
    // leaving the key with no TTL at all.
    const rlKey = globalRateLimitKey();
    const count = await client.incr(rlKey);
    await client.expire(rlKey, SECONDS_PER_DAY, 'NX');
    if (count > GLOBAL_EVENTS_PER_DAY) {
      return new NextResponse(null, { status: 429 });
    }

    // `receivedAt` is truncated to the hour. Full timestamps would let events be
    // correlated into per-session sequences, reconstructing by timing the
    // per-user thread the removal of `anonymousId` was meant to break.
    const receivedAt = new Date();
    receivedAt.setUTCMinutes(0, 0, 0);

    const payload = {
      ...parsed.data,
      receivedAt: receivedAt.toISOString(),
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
