import { afterEach, describe, expect, it } from 'vitest';
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
});
