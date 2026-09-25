import { NextResponse } from 'next/server';
import { recordTelemetryEvent } from './record';
import { CliCommandEventSchema } from './schema';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Schema and ceilings live in ./schema.ts and ./record.ts, shared with /mcp.
// CliCommandEventSchema is strict, so a stale CLI still sending `anonymousId`
// gets a visible 400 instead of having the field stripped in silence.
const MAX_BODY_BYTES = 4 * 1024;

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

  // CLI shape only, never the union — an mcp_tool_call event's rate-limit key is
  // caller-supplied, so accepting one here would make the counts forgeable.
  const parsed = CliCommandEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid event' }, { status: 400 });
  }

  // The ceiling lives in recordTelemetryEvent, which charges the shared
  // endpoint-wide budget only when a write is actually about to happen. For
  // this route that budget is the only ceiling: there is no identifier in the
  // payload to key a per-caller one on. 'rate-limited' can't come back here
  // (it is the MCP path's verdict) but is mapped anyway, so adding a
  // per-caller ceiling later doesn't silently start answering 204.
  const result = await recordTelemetryEvent(parsed.data);
  if (result === 'rate-limited' || result === 'quota-exceeded') {
    return new NextResponse(null, { status: 429 });
  }

  return new NextResponse(null, { status: 204 });
}
