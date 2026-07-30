import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readConfig, writeConfig } from './config.js';
import { emit, enumArg, slugArg } from './telemetry.js';

// This suite's own CI run has CI=true set, which ci-info detects and which
// isTelemetryDisabled() treats as an opt-out — short-circuiting emit()
// before it ever reaches the code path under test. Force it off so the
// regression below is actually exercised in CI, not just locally. Hoisted
// by vitest above the imports above, so it takes effect before `emit` is
// first resolved.
vi.mock('ci-info', () => ({ default: { isCI: false } }));

// Each test gets an isolated config dir so nothing touches the developer's real
// ~/.config/marigold while the suite runs.
let configDir: string;

beforeEach(() => {
  configDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-cli-test-'));
  vi.stubEnv('MARIGOLD_CONFIG_DIR', configDir);
});

describe('emit', () => {
  let blockedConfigDir: string;
  const originalConfigDir = process.env.MARIGOLD_CONFIG_DIR;
  const originalTelemetryDisabled = process.env.MARIGOLD_TELEMETRY_DISABLED;
  const originalDoNotTrack = process.env.DO_NOT_TRACK;

  beforeEach(() => {
    // A regular FILE where the config dir should be: writeConfig's
    // `fs.mkdirSync(configDir(), { recursive: true })` throws EEXIST against
    // it, simulating an unwritable/blocked config location (a read-only
    // home, a locked-down sandboxed AI-agent runner) without relying on
    // permission bits, which behave inconsistently across environments.
    const parent = fs.mkdtempSync(
      path.join(os.tmpdir(), 'telemetry-blocked-config-')
    );
    blockedConfigDir = path.join(parent, 'marigold');
    fs.writeFileSync(blockedConfigDir, 'not a directory');
    process.env.MARIGOLD_CONFIG_DIR = blockedConfigDir;
    delete process.env.MARIGOLD_TELEMETRY_DISABLED;
    delete process.env.DO_NOT_TRACK;
  });

  afterEach(() => {
    if (originalConfigDir === undefined) delete process.env.MARIGOLD_CONFIG_DIR;
    else process.env.MARIGOLD_CONFIG_DIR = originalConfigDir;
    if (originalTelemetryDisabled === undefined) {
      delete process.env.MARIGOLD_TELEMETRY_DISABLED;
    } else {
      process.env.MARIGOLD_TELEMETRY_DISABLED = originalTelemetryDisabled;
    }
    if (originalDoNotTrack === undefined) delete process.env.DO_NOT_TRACK;
    else process.env.DO_NOT_TRACK = originalDoNotTrack;
  });

  it('never throws, even when the config dir cannot be created (writeConfig failure)', () => {
    // showFirstRunNoticeIfNeeded() calls writeConfig() to persist the
    // one-time-notice flag, and writeConfig() has no try/catch of its own
    // (unlike readConfig()) — a config-dir write failure there must not turn
    // an unrelated command's clean, successful run into a crash.
    expect(() =>
      emit({
        command: 'validate',
        cliVersion: '0.0.0-test',
        startedAt: Date.now(),
        exitCode: 0,
      })
    ).not.toThrow();
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
