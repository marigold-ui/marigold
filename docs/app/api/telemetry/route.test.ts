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

  it('hands the parsed event on, dropping unknown keys', async () => {
    const res = await post({
      ...makeCliEvent({ command: 'docs' }),
      injected: 'nope',
    });

    expect(res.status).toBe(204);
    expect(record).toHaveBeenCalledTimes(1);
    expect(record.mock.calls[0][0]).not.toHaveProperty('injected');
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

  // Both ceilings live in recordTelemetryEvent now; the route just maps
  // either exhaustion onto 429. Ordering is pinned in record.test.ts.
  it('maps an exhausted endpoint-wide quota to 429', async () => {
    record.mockResolvedValue('quota-exceeded');

    const res = await post(makeCliEvent({ command: 'docs' }));

    expect(res.status).toBe(429);
  });
});
