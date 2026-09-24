import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readConfig, writeConfig } from './config.js';
import { emit, enumArg, intArg, slugArg } from './telemetry.js';

// This suite's own CI run has CI=true set, which ci-info detects and which
// isTelemetryDisabled() treats as an opt-out — short-circuiting emit()
// before it ever reaches the code path under test. Force it off so the
// regression below is actually exercised in CI, not just locally. Hoisted
// by vitest above the imports above, so it takes effect before `emit` is
// first resolved.
vi.mock('ci-info', () => ({ default: { isCI: false } }));

// Only spawn is stubbed, so no detached sender is ever launched and a test can
// tell whether an event would have left the machine.
vi.mock('node:child_process', () => ({
  spawn: vi.fn(() => ({ unref: vi.fn() })),
}));

// The sender script only exists in a build, so from source emit() would stop
// before spawn. Pretend it was found.
vi.mock('./fs-utils.js', () => ({
  firstExisting: vi.fn(() => '/fake/send-telemetry.mjs'),
}));

const spawnMock = vi.mocked(spawn);

// Each test gets an isolated config dir so nothing touches the developer's real
// ~/.config/marigold while the suite runs.
let configDir: string;

beforeEach(() => {
  configDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-cli-test-'));
  vi.stubEnv('MARIGOLD_CONFIG_DIR', configDir);
  vi.stubEnv('MARIGOLD_TELEMETRY_DISABLED', '');
  vi.stubEnv('DO_NOT_TRACK', '');
});

afterEach(() => {
  vi.unstubAllEnvs();
  spawnMock.mockClear();
  fs.rmSync(configDir, { recursive: true, force: true });
});

const emitTestEvent = () =>
  emit({
    command: 'validate',
    cliVersion: '0.0.0-test',
    startedAt: Date.now(),
    exitCode: 0,
  });

describe('emit', () => {
  let blockedParent: string;

  beforeEach(() => {
    // A regular FILE where the config dir should be: writeConfig's
    // `fs.mkdirSync(configDir(), { recursive: true })` throws EEXIST against
    // it, simulating an unwritable/blocked config location (a read-only
    // home, a locked-down sandboxed AI-agent runner) without relying on
    // permission bits, which behave inconsistently across environments.
    blockedParent = fs.mkdtempSync(
      path.join(os.tmpdir(), 'telemetry-blocked-config-')
    );
    const blockedConfigDir = path.join(blockedParent, 'marigold');
    fs.writeFileSync(blockedConfigDir, 'not a directory');
    vi.stubEnv('MARIGOLD_CONFIG_DIR', blockedConfigDir);
  });

  afterEach(() => {
    fs.rmSync(blockedParent, { recursive: true, force: true });
  });

  // emit() is called at the end of every command, so a failure anywhere in it
  // (here, a config dir that cannot be read or written) must not turn an
  // unrelated command's clean, successful run into a crash.
  it('never throws, even when the config dir is blocked', () => {
    expect(emitTestEvent).not.toThrow();
  });
});

describe('first-run notice', () => {
  let stderrSpy: ReturnType<typeof vi.spyOn>;
  const originalIsTTY = process.stderr.isTTY;

  const setStderrTTY = (value: boolean) => {
    process.stderr.isTTY = value;
  };

  beforeEach(() => {
    stderrSpy = vi
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    stderrSpy.mockRestore();
    process.stderr.isTTY = originalIsTTY;
  });

  const stderr = () => stderrSpy.mock.calls.flat().join('');

  // The notice is the disclosure, so nothing may be sent on the run that shows
  // it: the user gets a chance to opt out before any data leaves the machine.
  it('shows the notice on a terminal, persists that it did, and sends nothing', () => {
    setStderrTTY(true);

    emitTestEvent();

    expect(stderr()).toContain('No identifier is attached');
    expect(readConfig().telemetryNoticeShown).toBe(true);
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it('sends on the next run without repeating the notice', () => {
    setStderrTTY(true);
    emitTestEvent();
    stderrSpy.mockClear();

    emitTestEvent();

    expect(stderr()).toBe('');
    expect(spawnMock).toHaveBeenCalledTimes(1);
  });

  // A pipe run must not burn the notice: nobody would read it, and the next
  // interactive run would then never show it.
  it('neither prints nor persists the notice when stderr is not a terminal', () => {
    setStderrTTY(false);

    emitTestEvent();

    expect(stderr()).toBe('');
    expect(readConfig().telemetryNoticeShown).toBeUndefined();
  });

  it('sends nothing once the user has opted out', () => {
    setStderrTTY(true);
    writeConfig({ telemetryEnabled: false, telemetryNoticeShown: true });

    emitTestEvent();

    expect(spawnMock).not.toHaveBeenCalled();
  });
});

describe('slugArg', () => {
  it.each(['Button', 'DateRangePicker', 'getting-started/cli', 'form.field'])(
    'passes identifier-shaped value %s through',
    value => {
      expect(slugArg(value)).toBe(value);
    }
  );

  it('reports free-form prose as invalid rather than echoing it', () => {
    expect(slugArg('how do I validate a form')).toBe('invalid');
  });

  it('reports an over-long value as invalid', () => {
    expect(slugArg('a'.repeat(65))).toBe('invalid');
  });

  it('collapses missing and empty input to an empty string', () => {
    expect(slugArg(undefined)).toBe('');
    expect(slugArg('')).toBe('');
  });

  // `/` and `.` are legal for slugs, so a relative path matches the slug
  // pattern; its file extension is what gives it away.
  it('reports a relative file path as invalid', () => {
    expect(slugArg('packages/components/src/Button.tsx')).toBe('invalid');
    expect(slugArg('src/app.config.mjs')).toBe('invalid');
  });

  it('keeps dotted and nested slugs', () => {
    expect(slugArg('form.field')).toBe('form.field');
    expect(slugArg('getting-started/cli')).toBe('getting-started/cli');
  });
});

describe('intArg', () => {
  it('passes a positive integer through', () => {
    expect(intArg('10')).toBe('10');
  });

  it('reports anything else as invalid', () => {
    expect(intArg('abc123')).toBe('invalid');
    expect(intArg('0')).toBe('invalid');
    expect(intArg('-1')).toBe('invalid');
    expect(intArg('1.5')).toBe('invalid');
  });

  it('collapses missing and empty input to an empty string', () => {
    expect(intArg(undefined)).toBe('');
    expect(intArg('')).toBe('');
  });
});

describe('enumArg', () => {
  const formats = ['markdown', 'json', 'plain'] as const;

  it('passes a documented value through', () => {
    expect(enumArg('json', formats, 'markdown')).toBe('json');
  });

  it('falls back when the flag was not supplied', () => {
    expect(enumArg(undefined, formats, 'markdown')).toBe('markdown');
  });

  // Telemetry args are recorded before validation so failed runs still report
  // which flags were passed; a typo must not reach the wire verbatim.
  it('reports an undocumented value as invalid', () => {
    expect(enumArg('jsonn', formats, 'markdown')).toBe('invalid');
  });
});

describe('config', () => {
  // The identifier removal is only complete if configs written by older CLI
  // versions stop yielding the stale UUID on read, and stop carrying it on disk.
  it('strips a legacy anonymousId on read and erases it from disk', () => {
    fs.writeFileSync(
      path.join(configDir, 'config.json'),
      JSON.stringify({
        telemetryEnabled: true,
        anonymousId: '00000000-0000-4000-8000-000000000000',
      })
    );

    const config = readConfig();

    expect(config).not.toHaveProperty('anonymousId');
    expect(config.telemetryEnabled).toBe(true);

    const onDisk = JSON.parse(
      fs.readFileSync(path.join(configDir, 'config.json'), 'utf8')
    );
    expect(onDisk).not.toHaveProperty('anonymousId');
    expect(onDisk.telemetryEnabled).toBe(true);
  });

  it('round-trips a config without inventing an identifier', () => {
    writeConfig({ telemetryEnabled: false });

    expect(readConfig()).toEqual({ telemetryEnabled: false });
  });
});
