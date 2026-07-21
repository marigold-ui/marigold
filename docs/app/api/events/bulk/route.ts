import {
  authorizeBulk,
  bulkActions,
  eventChangesSchema,
  eventsSessionSchema,
} from '@/lib/data/events-query';
import { z } from 'zod';
import type { NextRequest } from 'next/server';

// POST /api/events/bulk — authorizes a bulk action per record.
//
// The demo has no database, so this route mirrors the venues DELETE handler's
// role: the server *authorizes* and reports the per-record split, and the
// client commits the outcome to its own session state (see useSession). The
// response shape is what a real bulk endpoint returns — `succeeded` ids plus
// `failed` ids with reasons — which is exactly what the pattern's
// partial-failure feedback is built from.
//
// One deterministic rule drives the failure path: publishing an event without
// an assigned venue is rejected. The check runs against the client's session
// overlay, so fixing the venue via bulk edit makes the retry succeed.

const bodySchema = z.object({
  action: z.enum(bulkActions),
  ids: z.array(z.string()).min(1).max(500),
  /** Present for `update`; the server only validates the shape. */
  changes: eventChangesSchema.optional(),
  session: eventsSessionSchema.optional(),
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const POST = async (request: NextRequest) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // `?delay=<ms>` slows the response so per-record progress ("Sending 4 of
  // 12") is observable when the client works through a selection.
  const { searchParams } = request.nextUrl;
  const delay = Number(searchParams.get('delay'));
  if (Number.isFinite(delay) && delay > 0) {
    await sleep(Math.min(delay, 5000));
  }

  const { action, ids, session } = parsed.data;
  return Response.json(authorizeBulk(action, ids, session));
};
