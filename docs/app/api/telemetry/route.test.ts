import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

// Build a valid telemetry event. The `command` field is the only thing each
// test varies; everything else is a known-good payload that satisfies
// EventSchema so we isolate the command-enum contract.
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
    // Redis is unconfigured in tests, so a valid event is accepted with 204
    // (the route returns 204 when getRedis() yields null). This lets us assert
    // schema acceptance without a backend.
    vi.stubEnv('KV_REST_API_URL', '');
    vi.stubEnv('KV_REST_API_TOKEN', '');
  });

  // Mirrors the CLI's CommandName union in packages/cli/src/lib/telemetry.ts —
  // guards against the union and the server schema silently drifting apart.
  it.each([
    'docs',
    'list',
    'search',
    'examples',
    'validate',
    'init',
    'telemetry',
  ])('accepts a %s command event', async command => {
    const res = await post(makeEvent(command));

    expect(res.status).not.toBe(400);
  });

  it('rejects an unknown command with 400', async () => {
    const res = await post(makeEvent('bogus'));

    expect(res.status).toBe(400);
  });
});
