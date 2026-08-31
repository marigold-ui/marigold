import { NextResponse } from 'next/server';
import { consumePublicQuota, recordTelemetryEvent } from './record';
import { CliCommandEventSchema } from './schema';

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

  // The CLI shape only, not the union: an `mcp_tool_call` event's rate-limit
  // key comes from its own caller-supplied `hashedCallerId`, so accepting one
  // here would make call volume and unique-caller counts forgeable.
  const parsed = CliCommandEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid event' }, { status: 400 });
  }

  // After validation: a malformed body is a cheap 400 that never reaches the
  // stream, so what's worth defending is the flow of valid events.
  if ((await consumePublicQuota()) === 'exceeded') {
    return new NextResponse(null, { status: 429 });
  }

  const result = await recordTelemetryEvent(parsed.data);
  if (result === 'rate-limited') {
    return new NextResponse(null, { status: 429 });
  }

  // 'recorded', 'unconfigured', and 'error' all accept silently — telemetry
  // must never leak backend state or cause CLI/MCP retries.
  return new NextResponse(null, { status: 204 });
}
