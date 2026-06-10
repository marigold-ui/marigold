import { describe, expect, it } from 'vitest';
import {
  checkTokenCompliance,
  isComputedTokenCandidate,
  isTokenCheckableSnapshot,
  isVisuallyHiddenInlineStyle,
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

describe('isVisuallyHiddenInlineStyle', () => {
  it('detects the React Aria VisuallyHidden clip idiom', () => {
    // The classic screen-reader-only element; its margin:-1px / padding:0 are
    // part of the clip hack, not author-chosen off-token spacing.
    const raw =
      'border:0;clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap';
    expect(isVisuallyHiddenInlineStyle(raw)).toBe(true);
  });

  it('detects the 1px/overflow-hidden variant without clip', () => {
    expect(
      isVisuallyHiddenInlineStyle(
        'position:absolute;width:1px;height:1px;overflow:hidden'
      )
    ).toBe(true);
  });

  it('does not match an ordinary author inline style', () => {
    expect(isVisuallyHiddenInlineStyle('margin-top:2rem;color:#ff0000')).toBe(
      false
    );
    expect(isVisuallyHiddenInlineStyle('padding:8px')).toBe(false);
  });
});
