import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TELEMETRY_COMMANDS } from './commands';
import { recordTelemetryEvent } from './record';
import { POST } from './route';
import { makeCliEvent, makeMcpEvent } from './test.utils';

const mcpEvent = makeMcpEvent();

vi.mock('./record', () => ({
  recordTelemetryEvent: vi.fn().mockResolvedValue('recorded'),
}));

const record = vi.mocked(recordTelemetryEvent);

const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(
    new Request('http://localhost/api/telemetry', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(body),
    })
  );

describe('POST /api/telemetry', () => {
  beforeEach(() => {
    record.mockReset();
    record.mockResolvedValue('recorded');
  });

  // Derived from the route's own enum, so a new command is covered
  // automatically; commands.test.ts holds that enum to the CLI's union.
  it.each(TELEMETRY_COMMANDS)('accepts a %s command event', async command => {
    const res = await post(makeCliEvent({ command }));

    expect(res.status).toBe(204);
    expect(record).toHaveBeenCalledWith(expect.objectContaining({ command }));
  });

  it('rejects an unknown command with 400 without recording anything', async () => {
    const res = await post({ ...makeCliEvent(), command: 'bogus' });

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  // The schema is strict, so an unknown key fails the parse rather than being
  // stripped. Stripping would be enough to keep the field out of the store,
  // but it is invisible: nobody learns the sender is wrong, and the field
  // reappears the moment someone relaxes the schema.
  it('rejects an unknown key with 400 rather than stripping it', async () => {
    const res = await post({
      ...makeCliEvent({ command: 'docs' }),
      injected: 'nope',
    });

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  // The identifying key this endpoint used to require. A stale CLI still
  // sending it gets a visible 400 instead of a quiet drop. See
  // packages/cli/src/lib/config.ts for why the payload is identifier-free.
  it('rejects an event carrying an anonymousId with 400', async () => {
    const res = await post({
      ...makeCliEvent({ command: 'docs' }),
      anonymousId: '00000000-0000-4000-8000-000000000000',
    });

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  it('accepts identifier-shaped args', async () => {
    const res = await post(
      makeCliEvent({ command: 'docs', args: { component: 'Button' } })
    );

    expect(res.status).toBe(204);
  });

  // `args` is a record, so the strict top-level check does not reach its
  // keys. Bounding them keeps an arbitrary sender from using it as a free-form
  // payload.
  it('rejects an args key over 32 characters with 400', async () => {
    const res = await post(
      makeCliEvent({ command: 'docs', args: { ['k'.repeat(33)]: 'v' } })
    );

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  it('rejects more than 16 args with 400', async () => {
    const args = Object.fromEntries(
      Array.from({ length: 17 }, (_, i) => [`k${i}`, 'v'])
    );
    const res = await post(makeCliEvent({ command: 'docs', args }));

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  it('maps a rate-limited event to 429', async () => {
    record.mockResolvedValue('rate-limited');

    const res = await post(makeCliEvent({ command: 'docs' }));

    expect(res.status).toBe(429);
  });

  // These all accept silently, so telemetry never leaks backend state and the
  // CLI never retries. 'invalid' means the event failed record.ts's own schema
  // after passing the route's — a bug on our side, not something to report.
  it.each(['unconfigured', 'error', 'invalid'] as const)(
    'accepts silently with 204 when recording returns %s',
    async result => {
      record.mockResolvedValue(result);

      const res = await post(makeCliEvent({ command: 'docs' }));

      expect(res.status).toBe(204);
    }
  );

  it('rejects a body over the size limit with 413', async () => {
    const res = await POST(
      new Request('http://localhost/api/telemetry', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': String(5 * 1024),
        },
        body: JSON.stringify(makeCliEvent({ command: 'docs' })),
      })
    );

    expect(res.status).toBe(413);
    expect(record).not.toHaveBeenCalled();
  });

  it('rejects a malformed JSON body with 400', async () => {
    const res = await POST(
      new Request('http://localhost/api/telemetry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: 'not json',
      })
    );

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  // Its rate-limit key comes from a caller-supplied field, so accepting one on
  // a public endpoint would make call volume and unique callers forgeable.
  it('rejects an otherwise valid mcp_tool_call event with 400', async () => {
    const res = await post(mcpEvent);

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  // The ceiling lives in recordTelemetryEvent now; the route just maps
  // exhaustion onto 429. This is the only one a CLI event can trip, since
  // there is no identifier to key a per-caller ceiling on.
  it('maps an exhausted endpoint-wide quota to 429', async () => {
    record.mockResolvedValue('quota-exceeded');

    const res = await post(makeCliEvent({ command: 'docs' }));

    expect(res.status).toBe(429);
  });
});
