import { NextResponse } from 'next/server';
import { isPublicQuotaExceeded, recordTelemetryEvent } from './record';
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

  // CLI shape only, never the union — an mcp_tool_call event's rate-limit key is
  // caller-supplied, so accepting one here would make the counts forgeable.
  const parsed = CliCommandEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid event' }, { status: 400 });
  }

  if (await isPublicQuotaExceeded()) {
    return new NextResponse(null, { status: 429 });
  }

  const result = await recordTelemetryEvent(parsed.data);
  if (result === 'rate-limited') {
    return new NextResponse(null, { status: 429 });
  }

  return new NextResponse(null, { status: 204 });
}
