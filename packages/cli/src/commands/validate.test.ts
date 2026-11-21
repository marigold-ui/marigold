import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseChecks, runValidate } from './validate.js';

describe('parseChecks', () => {
  it('expands "all" to the three check groups', () => {
    expect(parseChecks('all')).toEqual(['technical', 'spatial', 'a11y']);
  });

  it('accepts a single check', () => {
    expect(parseChecks('technical')).toEqual(['technical']);
    expect(parseChecks('spatial')).toEqual(['spatial']);
    expect(parseChecks('a11y')).toEqual(['a11y']);
  });

  it('rejects unknown or comma-separated values', () => {
    expect(() => parseChecks('bogus')).toThrow(/Invalid check/);
    // comma subsets are intentionally unsupported, matching the bin guard
    expect(() => parseChecks('technical,spatial')).toThrow(/Invalid check/);
  });
});

describe('runValidate', () => {
  afterEach(() => {
    delete process.env.MARIGOLD_VALIDATE_DISABLED;
  });

  it('skips cleanly (hasErrors: false) when disabled via MARIGOLD_VALIDATE_DISABLED', async () => {
    process.env.MARIGOLD_VALIDATE_DISABLED = '1';
    const result = await runValidate({ file: 'anything.tsx' });
    expect(result.hasErrors).toBe(false);
    expect(result.output).toMatch(/disabled/i);
  });

  it('emits parseable JSON (not an English sentence) when disabled with --format json', async () => {
    process.env.MARIGOLD_VALIDATE_DISABLED = '1';
    const result = await runValidate({ file: 'anything.tsx', format: 'json' });
    expect(result.hasErrors).toBe(false);
    expect(() => JSON.parse(result.output)).not.toThrow();
    expect(JSON.parse(result.output)).toEqual({
      skipped: true,
      reason: 'MARIGOLD_VALIDATE_DISABLED=1',
    });
  });

  // Both used to exit 0 with one "check failed: internal error" warning per
  // checker, which an agent gating on the exit code reads as a clean file.
  describe('rejects a target it cannot validate', () => {
    let dir: string;
    beforeEach(() => {
      dir = mkdtempSync(path.join(tmpdir(), 'marigold-validate-'));
    });
    afterEach(() => rmSync(dir, { recursive: true, force: true }));

    it('rejects a directory and says to pass one file', async () => {
      await expect(
        runValidate({ file: dir, checks: 'technical' })
      ).rejects.toThrow(/is a directory.*one file at a time/s);
    });

    it('rejects a file that is not TypeScript or JavaScript', async () => {
      const file = path.join(dir, 'styles.css');
      writeFileSync(file, 'a { color: red }');

      await expect(runValidate({ file, checks: 'technical' })).rejects.toThrow(
        /Unsupported file type ".css"/
      );
    });

    it('rejects a file without an extension with a readable message', async () => {
      const file = path.join(dir, 'Dockerfile');
      writeFileSync(file, 'FROM node');

      await expect(runValidate({ file, checks: 'technical' })).rejects.toThrow(
        /"Dockerfile" has no extension/
      );
    });
  });
});
