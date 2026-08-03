import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TELEMETRY_COMMANDS } from './commands';
import { recordTelemetryEvent } from './record';
import { POST } from './route';

vi.mock('./record', () => ({
  recordTelemetryEvent: vi.fn().mockResolvedValue('recorded'),
}));

const record = vi.mocked(recordTelemetryEvent);

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

const post = (body: unknown) =>
  POST(
    new Request('http://localhost/api/telemetry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  );

describe('POST /api/telemetry', () => {
  beforeEach(() => {
    record.mockReset();
    record.mockResolvedValue('recorded');
  });

  // Derived from the route's own command enum, so a command added there is
  // covered automatically and no second list can drift out of sync.
  // commands.test.ts is what holds that enum to the CLI's union.
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

  // This endpoint is public, and an `mcp_tool_call` event's rate-limit key is
  // derived from its caller-supplied `hashedCallerId` — so accepting one here
  // would make call volume and unique-caller counts forgeable without bound.
  // MCP events are only ever written in-process via `recordTelemetryEvent`.
  it('rejects an otherwise valid mcp_tool_call event with 400', async () => {
    const res = await post(mcpEvent);

    expect(res.status).toBe(400);
    expect(record).not.toHaveBeenCalled();
  });
});
