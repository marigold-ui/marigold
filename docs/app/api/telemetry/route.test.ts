import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TELEMETRY_COMMANDS } from './commands';
import { consumePublicIpQuota, recordTelemetryEvent } from './record';
import { POST } from './route';

vi.mock('./record', () => ({
  recordTelemetryEvent: vi.fn().mockResolvedValue('recorded'),
  consumePublicIpQuota: vi.fn().mockResolvedValue('ok'),
}));

const record = vi.mocked(recordTelemetryEvent);
const ipQuota = vi.mocked(consumePublicIpQuota);

const makeEvent = (command: string) => ({
  event: 'cli_command',
  command,
  cliVersion: '1.0.0',
  nodeVersion: '24.0.0',
  platform: 'darwin',
  isTTY: true,
  isAIAgent: false,
  durationBucket: '0-100',
  exitCode: 0,
  anonymousId: '00000000-0000-4000-8000-000000000000',
});

const mcpEvent = {
  event: 'mcp_tool_call',
  tool: 'search_docs',
  hashedCallerId: 'a'.repeat(64),
  latencyMs: 120,
  success: true,
  topMatchFile: 'Button.mdx',
  topMatchHeading: 'Usage',
};

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
    ipQuota.mockReset();
    ipQuota.mockResolvedValue('ok');
  });

  // Derived from the route's own enum, so a new command is covered
  // automatically; commands.test.ts holds that enum to the CLI's union.
  it.each(TELEMETRY_COMMANDS)('accepts a %s command event', async command => {
    const res = await post(makeEvent(command));

    expect(res.status).toBe(204);
    expect(record).toHaveBeenCalledWith(expect.objectContaining({ command }));
  });

  it('rejects an unknown command with 400 without recording anything', async () => {
    const res = await post(makeEvent('bogus'));

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });

  it('hands the parsed event on, dropping unknown keys', async () => {
    const res = await post({ ...makeEvent('docs'), injected: 'nope' });

    expect(res.status).toBe(204);
    expect(record).toHaveBeenCalledTimes(1);
    expect(record.mock.calls[0][0]).not.toHaveProperty('injected');
  });

  it('maps a rate-limited event to 429', async () => {
    record.mockResolvedValue('rate-limited');

    const res = await post(makeEvent('docs'));

    expect(res.status).toBe(429);
  });

  // 'unconfigured' and 'error' both accept silently, so telemetry never leaks
  // backend state and the CLI never retries.
  it.each(['unconfigured', 'error'] as const)(
    'accepts silently with 204 when recording returns %s',
    async result => {
      record.mockResolvedValue(result);

      const res = await post(makeEvent('docs'));

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
        body: JSON.stringify(makeEvent('docs')),
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

  // The quota inside recordTelemetryEvent keys on the body's own `anonymousId`,
  // so rotating it walks past; this one keys on the client address instead.
  describe('per-IP quota', () => {
    it('takes the client address from the first x-forwarded-for entry', async () => {
      await post(makeEvent('docs'), {
        'x-forwarded-for': '203.0.113.7, 70.41.3.18, 150.172.238.178',
      });

      expect(ipQuota).toHaveBeenCalledWith('203.0.113.7');
    });

    it('falls back to x-real-ip', async () => {
      await post(makeEvent('docs'), { 'x-real-ip': '203.0.113.9' });

      expect(ipQuota).toHaveBeenCalledWith('203.0.113.9');
    });

    it('passes null when no address header is present', async () => {
      await post(makeEvent('docs'));

      expect(ipQuota).toHaveBeenCalledWith(null);
    });

    it('rejects with 429 without recording once the address is over quota', async () => {
      ipQuota.mockResolvedValue('exceeded');

      const res = await post(makeEvent('docs'), {
        'x-forwarded-for': '203.0.113.7',
      });

      expect(res.status).toBe(429);
      expect(record).not.toHaveBeenCalled();
    });

    // Fail open: a quota check that can't run must not start turning away
    // traffic, or a Redis outage would take the CLI's telemetry down with it.
    it('records normally when the quota check is unavailable', async () => {
      ipQuota.mockResolvedValue('unavailable');

      const res = await post(makeEvent('docs'));

      expect(res.status).toBe(204);
      expect(record).toHaveBeenCalledTimes(1);
    });

    it('is not consulted for a body that fails validation', async () => {
      const res = await post(makeEvent('bogus'));

      expect(res.status).toBe(400);
      expect(ipQuota).not.toHaveBeenCalled();
    });
  });
});
