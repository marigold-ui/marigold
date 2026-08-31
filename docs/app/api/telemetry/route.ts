import { NextResponse } from 'next/server';
import { recordTelemetryEvent } from './record';
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

  // The CLI shape only, not the full union. An `mcp_tool_call` event's
  // rate-limit key comes from its own caller-supplied `hashedCallerId`, so
  // accepting one on this public endpoint would make call volume and
  // unique-caller counts forgeable. MCP events are recorded in-process.
  const parsed = CliCommandEventSchema.safeParse(body);
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
