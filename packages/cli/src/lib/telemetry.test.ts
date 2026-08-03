import { beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readConfig, writeConfig } from './config.js';
import { enumArg, slugArg } from './telemetry.js';

// Each test gets an isolated config dir so nothing touches the developer's real
// ~/.config/marigold while the suite runs.
let configDir: string;

beforeEach(() => {
  configDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-cli-test-'));
  vi.stubEnv('MARIGOLD_CONFIG_DIR', configDir);
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
