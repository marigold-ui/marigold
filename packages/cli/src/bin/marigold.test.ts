import { vi } from 'vitest';
import { main } from './marigold.js';

// Suppress the auto-invocation guard: when `process.argv[1]` is anything other
// than this module's file URL, the bottom of bin/marigold.ts does nothing on
// import. Vitest's argv never matches, so importing is safe.

const emitMock = vi.hoisted(() => vi.fn());

vi.mock('../lib/telemetry.js', () => ({
  emit: emitMock,
}));

vi.mock('../commands/docs.js', () => ({
  runDocs: vi.fn(async () => ({ output: 'docs output', cacheHit: false })),
}));

vi.mock('../commands/list.js', () => ({
  runList: vi.fn(async () => ({ output: 'list output', cacheHit: false })),
}));

vi.mock('../commands/examples.js', () => ({
  runExamples: vi.fn(async () => ({
    output: 'examples output',
    cacheHit: false,
  })),
}));

vi.mock('../commands/search.js', () => ({
  runSearch: vi.fn(async () => ({ output: 'search output', cacheHit: false })),
}));

vi.mock('../commands/doctor.js', () => ({
  runDoctor: vi.fn(async () => ({ output: 'doctor output', hasErrors: false })),
}));

let stdoutSpy: ReturnType<typeof vi.spyOn>;
let stderrSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
});

afterEach(() => {
  emitMock.mockClear();
  stdoutSpy.mockRestore();
  stderrSpy.mockRestore();
});

describe('main() — telemetry on validation failure', () => {
  test('emits exitCode 1 with args when --section is invalid', async () => {
    const code = await main(['docs', 'Button', '--section', 'bogus']);

    expect(code).toBe(1);
    expect(emitMock).toHaveBeenCalledTimes(1);

    const event = emitMock.mock.calls[0][0];
    expect(event).toMatchObject({
      command: 'docs',
      exitCode: 1,
      args: expect.objectContaining({
        component: 'Button',
        section: 'bogus',
      }),
    });
  });

  test('emits exitCode 1 when the component positional is missing', async () => {
    const code = await main(['docs']);

    expect(code).toBe(1);
    expect(emitMock).toHaveBeenCalledTimes(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'docs',
      exitCode: 1,
      args: expect.objectContaining({ component: '' }),
    });
  });

  test('emits exitCode 1 when telemetry subcommand is missing', async () => {
    const code = await main(['telemetry']);

    expect(code).toBe(1);
    expect(emitMock).toHaveBeenCalledTimes(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'telemetry',
      exitCode: 1,
    });
  });

  test('does not emit telemetry for unknown commands', async () => {
    const code = await main(['nonsense']);

    expect(code).toBe(1);
    expect(emitMock).not.toHaveBeenCalled();
  });
});

describe('main() — examples command', () => {
  test('dispatches `examples list` and emits success telemetry', async () => {
    const code = await main(['examples', 'list']);

    expect(code).toBe(0);
    expect(emitMock).toHaveBeenCalledTimes(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'examples',
      exitCode: 0,
      args: expect.objectContaining({ sub: 'list' }),
    });
  });

  test('dispatches `examples get <slug>` with the slug in telemetry', async () => {
    const code = await main(['examples', 'get', 'filter']);

    expect(code).toBe(0);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'examples',
      exitCode: 0,
      args: expect.objectContaining({ sub: 'get', slug: 'filter' }),
    });
  });

  test('fails when the subcommand is missing', async () => {
    const code = await main(['examples']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'examples',
      exitCode: 1,
    });
  });

  test('fails when the subcommand is invalid', async () => {
    const code = await main(['examples', 'bogus']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({ exitCode: 1 });
  });

  test('fails when `get` has no slug', async () => {
    const code = await main(['examples', 'get']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'examples',
      exitCode: 1,
      args: expect.objectContaining({ sub: 'get' }),
    });
  });

  test('fails when `list` is given a trailing positional', async () => {
    const code = await main(['examples', 'list', 'filter']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'examples',
      exitCode: 1,
      args: expect.objectContaining({ sub: 'list' }),
    });
  });

  test('fails when `get` is given an extra positional', async () => {
    const code = await main(['examples', 'get', 'filter', 'extra']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'examples',
      exitCode: 1,
      args: expect.objectContaining({ sub: 'get', slug: 'filter' }),
    });
  });
});

describe('main() — search command', () => {
  test('dispatches a query and emits success telemetry', async () => {
    const code = await main(['search', 'field', 'validation']);

    expect(code).toBe(0);
    expect(emitMock).toHaveBeenCalledTimes(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'search',
      exitCode: 0,
      // The raw query is never sent — only that one was provided.
      args: expect.objectContaining({ query: 'used' }),
    });
  });

  test('fails when the query is missing', async () => {
    const code = await main(['search']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'search',
      exitCode: 1,
    });
  });

  test('fails when --limit is not a positive integer', async () => {
    const code = await main(['search', 'tag', '--limit', '0']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'search',
      exitCode: 1,
      args: expect.objectContaining({ limit: '0' }),
    });
  });

  test('fails when --format is invalid', async () => {
    const code = await main(['search', 'tag', '--format', 'bogus']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({ exitCode: 1 });
  });
});

describe('main() — doctor command', () => {
  test('dispatches doctor and records the format in telemetry', async () => {
    const code = await main(['doctor']);

    expect(code).toBe(0);
    expect(emitMock).toHaveBeenCalledTimes(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'doctor',
      exitCode: 0,
      args: expect.objectContaining({ format: 'text' }),
    });
  });

  test('fails on an unexpected positional', async () => {
    const code = await main(['doctor', 'foo']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'doctor',
      exitCode: 1,
    });
  });

  test('clamps an invalid --format to `invalid` in telemetry', async () => {
    const code = await main(['doctor', '--format', 'banana']);

    expect(code).toBe(1);
    // The raw string must never reach telemetry — it is clamped to an enum.
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'doctor',
      exitCode: 1,
      args: expect.objectContaining({ format: 'invalid' }),
    });
  });
});
