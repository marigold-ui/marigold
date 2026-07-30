import { vi } from 'vitest';
import { main } from './marigold.js';

// Suppress the auto-invocation guard: when `process.argv[1]` is anything other
// than this module's file URL, the bottom of bin/marigold.ts does nothing on
// import. Vitest's argv never matches, so importing is safe.

const emitMock = vi.hoisted(() => vi.fn());

// Partial mock: only `emit` is stubbed, so the real `slugArg`/`enumArg` clamps
// stay in the path and the args asserted below are the ones that would actually
// be sent.
vi.mock('../lib/telemetry.js', async importOriginal => ({
  ...(await importOriginal<typeof import('../lib/telemetry.js')>()),
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

// Unlike the other commands, runValidate's `hasErrors` is what the bin layer
// maps onto the process exit code, so tests need to vary it per case rather
// than pin one return value here.
const runValidateMock = vi.hoisted(() =>
  vi.fn(async () => ({ output: 'validate output', hasErrors: false }))
);

vi.mock('../commands/validate.js', () => ({
  runValidate: runValidateMock,
}));

let stdoutSpy: ReturnType<typeof vi.spyOn>;
let stderrSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
});

afterEach(() => {
  emitMock.mockClear();
  runValidateMock.mockClear();
  stdoutSpy.mockRestore();
  stderrSpy.mockRestore();
});

describe('main() — telemetry on validation failure', () => {
  // A failed run still reports which flags were supplied, but the rejected value
  // is clamped to 'invalid' rather than echoed back — telemetry must never carry
  // raw user input.
  test('emits exitCode 1 and clamps an invalid --section', async () => {
    const code = await main(['docs', 'Button', '--section', 'bogus']);

    expect(code).toBe(1);
    expect(emitMock).toHaveBeenCalledTimes(1);

    const event = emitMock.mock.calls[0][0];
    expect(event).toMatchObject({
      command: 'docs',
      exitCode: 1,
      args: expect.objectContaining({
        component: 'Button',
        section: 'invalid',
      }),
    });
  });

  // Guards the identifier-free contract at the point of emit: no field in the
  // payload may single out a machine, user, or session.
  test('emits no identifying field', async () => {
    await main(['docs', 'Button']);

    const event = emitMock.mock.calls[0][0];
    expect(event).not.toHaveProperty('anonymousId');
    expect(Object.keys(event)).toEqual(
      expect.not.arrayContaining([
        'anonymousId',
        'userId',
        'sessionId',
        'machineId',
      ])
    );
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

describe('main() — migrate command', () => {
  // The version positional is optional, so a mistyped version is otherwise
  // indistinguishable from a path. The hint has to be checked before the
  // positional-count validation, which would reject this as "too many paths".
  test('names the migration a version-ish positional probably meant', async () => {
    const code = await main(['migrate', '18.1', './src']);

    expect(code).toBe(1);
    expect(stderrSpy.mock.calls.flat().join('')).toContain('Did you mean v18?');
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'migrate',
      exitCode: 1,
      args: expect.objectContaining({ version: 'auto' }),
    });
  });
});

describe('main() — validate command', () => {
  test('dispatches validate with the default checks and format', async () => {
    const code = await main(['validate', 'Component.tsx']);

    expect(code).toBe(0);
    expect(runValidateMock).toHaveBeenCalledWith({
      file: 'Component.tsx',
      checks: 'all',
      format: 'text',
    });
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'validate',
      exitCode: 0,
      args: expect.objectContaining({ checks: 'all', format: 'text' }),
    });
  });

  test('forwards explicit --checks and --format', async () => {
    const code = await main([
      'validate',
      'Component.tsx',
      '--checks',
      'technical',
      '--format',
      'json',
    ]);

    expect(code).toBe(0);
    expect(runValidateMock).toHaveBeenCalledWith({
      file: 'Component.tsx',
      checks: 'technical',
      format: 'json',
    });
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'validate',
      args: expect.objectContaining({ checks: 'technical', format: 'json' }),
    });
  });

  // The exit-code contract the whole command rests on: findings are reported
  // through `hasErrors`, never by throwing, and a warning-only run stays 0.
  test('exits 1 when the report contains errors', async () => {
    runValidateMock.mockResolvedValueOnce({
      output: 'validate output',
      hasErrors: true,
    });

    const code = await main(['validate', 'Component.tsx']);

    expect(code).toBe(1);
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'validate',
      exitCode: 1,
    });
  });

  test('fails with a usage error when the file positional is missing', async () => {
    const code = await main(['validate']);

    expect(code).toBe(1);
    expect(stderrSpy.mock.calls.flat().join('')).toContain(
      'Usage: marigold validate <file.tsx>'
    );
    expect(runValidateMock).not.toHaveBeenCalled();
  });

  test('rejects a second file instead of silently validating only the first', async () => {
    const code = await main(['validate', 'a.tsx', 'b.tsx']);

    expect(code).toBe(1);
    expect(stderrSpy.mock.calls.flat().join('')).toContain(
      'one file at a time'
    );
    // The point of the guard: exiting 0 after checking only a.tsx would read
    // as "both files are fine".
    expect(runValidateMock).not.toHaveBeenCalled();
  });

  test('clamps an invalid --checks to `invalid` in telemetry', async () => {
    const code = await main([
      'validate',
      'Component.tsx',
      '--checks',
      'banana',
    ]);

    expect(code).toBe(1);
    expect(runValidateMock).not.toHaveBeenCalled();
    // The raw string must never reach telemetry — it is clamped to an enum.
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'validate',
      exitCode: 1,
      args: expect.objectContaining({ checks: 'invalid', format: 'text' }),
    });
  });

  test('clamps an invalid --format to `invalid` in telemetry', async () => {
    const code = await main([
      'validate',
      'Component.tsx',
      '--format',
      'banana',
    ]);

    expect(code).toBe(1);
    expect(runValidateMock).not.toHaveBeenCalled();
    expect(emitMock.mock.calls[0][0]).toMatchObject({
      command: 'validate',
      exitCode: 1,
      args: expect.objectContaining({ checks: 'all', format: 'invalid' }),
    });
  });
});
