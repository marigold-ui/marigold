import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { recordTelemetryEvent } from './record';
import { POST } from './route';
import { CliCommandEventSchema } from './schema';

vi.mock('./record', () => ({
  recordTelemetryEvent: vi.fn().mockResolvedValue('recorded'),
}));

const record = vi.mocked(recordTelemetryEvent);

// The CLI's `CommandName` union is the source of truth for what can arrive
// here. docs doesn't depend on @marigold/cli (it only exports built dist), so
// rather than hand-copying the list into a third place and hoping a comment
// keeps it honest, read it straight out of the CLI source. An unknown command
// is a 400 and the CLI is fire-and-forget, so drift silently drops every event
// for the new command — it has to fail here instead.
const CLI_TELEMETRY_SOURCE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../../packages/cli/src/lib/telemetry.ts'
);

const cliCommandNames = (): string[] => {
  const hint = `If the CLI moved or renamed its CommandName union, point this test at the new location — do not delete it. Expected to find it in ${CLI_TELEMETRY_SOURCE}.`;

  let source: string;
  try {
    source = readFileSync(CLI_TELEMETRY_SOURCE, 'utf-8');
  } catch (err) {
    throw new Error(`Could not read the CLI telemetry source. ${hint}`, {
      cause: err,
    });
  }

  const union = source.match(/export type CommandName =([^;]+);/);
  if (!union) {
    throw new Error(`Could not find the CommandName union. ${hint}`);
  }
  return [...union[1].matchAll(/'([^']+)'/g)].map(([, name]) => name);
};

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

  it('accepts every command the CLI can emit, and nothing more', () => {
    expect(new Set(CliCommandEventSchema.shape.command.options)).toEqual(
      new Set(cliCommandNames())
    );
  });

  it.each(cliCommandNames())('accepts a %s command event', async command => {
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
