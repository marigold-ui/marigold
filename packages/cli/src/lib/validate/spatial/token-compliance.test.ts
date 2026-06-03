import { describe, expect, it } from 'vitest';
import {
  checkTokenCompliance,
  isComputedTokenCandidate,
  isTokenCheckableSnapshot,
  snapshotBrowserDefaults,
} from './token-compliance.js';

describe('checkTokenCompliance', () => {
  it('exports snapshotBrowserDefaults function', () => {
    expect(typeof snapshotBrowserDefaults).toBe('function');
  });

  it('exports checkTokenCompliance function', () => {
    expect(typeof checkTokenCompliance).toBe('function');
  });
});

describe('isComputedTokenCandidate', () => {
  it('includes color-family properties (exact rgb() match is sound)', () => {
    expect(isComputedTokenCandidate('color')).toBe(true);
    expect(isComputedTokenCandidate('background-color')).toBe(true);
    expect(isComputedTokenCandidate('border-color')).toBe(true);
    expect(isComputedTokenCandidate('outline-color')).toBe(true);
    expect(isComputedTokenCandidate('fill')).toBe(true);
    expect(isComputedTokenCandidate('stroke')).toBe(true);
  });

  it('excludes theme-derived spacing/typography/radius (size-scaling bias)', () => {
    expect(isComputedTokenCandidate('line-height')).toBe(false);
    expect(isComputedTokenCandidate('padding')).toBe(false);
    expect(isComputedTokenCandidate('border-radius')).toBe(false);
    expect(isComputedTokenCandidate('font-size')).toBe(false);
    expect(isComputedTokenCandidate('gap')).toBe(false);
    expect(isComputedTokenCandidate('margin')).toBe(false);
  });
});

describe('isTokenCheckableSnapshot', () => {
  it('skips disabled elements (state-treatment colors carry alpha)', () => {
    // A Marigold <Button disabled> renders rgba(…, 0.3) — a disabled-state
    // composite that can never reverse-map to an opaque token. Checking it
    // would be a false "off-token" warning on correct code.
    expect(isTokenCheckableSnapshot({ disabled: true })).toBe(false);
  });

  it('checks non-disabled elements', () => {
    expect(isTokenCheckableSnapshot({ disabled: false })).toBe(true);
    expect(isTokenCheckableSnapshot({})).toBe(true);
  });
});
