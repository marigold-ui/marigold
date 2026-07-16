import { NextResponse } from 'next/server';
import { recordTelemetryEvent } from './record';
import { EventSchema } from './schema';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid event' }, { status: 400 });
  }

  const result = await recordTelemetryEvent(parsed.data);
  if (result === 'rate-limited') {
    return new NextResponse(null, { status: 429 });
  }

  // 'recorded', 'unconfigured', and 'error' all accept silently — telemetry
  // must never leak backend state or cause CLI/MCP retries.
  return new NextResponse(null, { status: 204 });
}
