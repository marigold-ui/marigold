import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { emit } from './telemetry.js';

// This suite's own CI run has CI=true set, which ci-info detects and which
// isTelemetryDisabled() treats as an opt-out — short-circuiting emit()
// before it ever reaches the code path under test. Force it off so the
// regression below is actually exercised in CI, not just locally. Hoisted
// by vitest above the imports above, so it takes effect before `emit` is
// first resolved.
vi.mock('ci-info', () => ({ default: { isCI: false } }));

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

  it('never throws, even when the config dir cannot be created (anonymousId -> writeConfig failure)', () => {
    // anonymousId() lazily calls writeConfig() on a first run (no cached
    // anonymousId yet), and writeConfig() has no try/catch of its own (unlike
    // readConfig()) — a config-dir write failure there must not turn an
    // unrelated command's clean, successful run into a crash.
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
