import { describe, expect, it } from 'vitest';
import {
  HARDCODED_VALUE,
  checkTokenCompliance,
  isBrowserDefault,
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

describe('isBrowserDefault', () => {
  const defaults = new Map([['color', new Set(['rgb(0, 0, 238)'])]]);

  it('applies the exemption when the LEAF element is native', () => {
    expect(
      isBrowserDefault(
        'div:nth-child(1) > a:nth-child(2)',
        'color',
        'rgb(0, 0, 238)',
        defaults
      )
    ).toBe(true);
  });

  it('does not apply the exemption when only an ANCESTOR is native, not the leaf', () => {
    // Regression: an unanchored match against the whole selector chain fired
    // here purely because of the ancestor <div> — even though the leaf
    // (<svg>, not a native form/text element) is what the value actually
    // belongs to. A real off-token color on a non-native leaf must still be
    // checkable, not silently exempted by an unrelated ancestor.
    expect(
      isBrowserDefault(
        'div:nth-child(1) > svg:nth-child(1)',
        'color',
        'rgb(0, 0, 238)',
        defaults
      )
    ).toBe(false);
  });
});

describe('HARDCODED_VALUE', () => {
  it('matches a bare numeric font-weight/line-height literal', () => {
    // Regression: font-weight and line-height are tokenizable properties
    // whose valid values are unitless numbers (`fontWeight: 700`,
    // `lineHeight: 1.5`) — the single most common hardcoded form for either
    // — but the regex previously required a length-unit suffix, so neither
    // was ever detected.
    expect(HARDCODED_VALUE.test('700')).toBe(true);
    expect(HARDCODED_VALUE.test('1.5')).toBe(true);
  });

  it('matches a percentage value', () => {
    expect(HARDCODED_VALUE.test('5%')).toBe(true);
  });

  it('still matches the existing unit/color/function forms', () => {
    expect(HARDCODED_VALUE.test('4px')).toBe(true);
    expect(HARDCODED_VALUE.test('#ff0000')).toBe(true);
    expect(HARDCODED_VALUE.test('rgba(0, 0, 0, 0.5)')).toBe(true);
  });

  it('does not match a CSS variable reference or a bare keyword', () => {
    expect(HARDCODED_VALUE.test('var(--color-primary)')).toBe(false);
    expect(HARDCODED_VALUE.test('normal')).toBe(false);
    expect(HARDCODED_VALUE.test('bold')).toBe(false);
  });
});
