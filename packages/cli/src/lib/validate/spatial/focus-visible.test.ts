import { describe, expect, it } from 'vitest';
import {
  type FocusStyleFingerprint,
  focusIndicatorChanged,
} from './focus-visible.js';

const fp = (
  over: Partial<FocusStyleFingerprint> = {}
): FocusStyleFingerprint => ({
  outline: 'none|0px|rgb(0, 0, 0)|0px',
  boxShadow: 'none',
  border: '0px|none|rgb(0,0,0)',
  backgroundColor: 'rgb(255, 255, 255)',
  color: 'rgb(0, 0, 0)',
  before: 'none|0px||0px|none|none|rgba(0, 0, 0, 0)',
  after: 'none|0px||0px|none|none|rgba(0, 0, 0, 0)',
  ...over,
});

describe('focusIndicatorChanged', () => {
  it('is false when nothing changes (no visible focus -> 2.4.7 fail)', () => {
    expect(focusIndicatorChanged(fp(), fp())).toBe(false);
  });

  it('detects an outline appearing on focus', () => {
    expect(
      focusIndicatorChanged(
        fp(),
        fp({ outline: 'solid|2px|rgb(0, 90, 200)|2px' })
      )
    ).toBe(true);
  });

  it('detects a box-shadow ring appearing on focus', () => {
    expect(
      focusIndicatorChanged(
        fp(),
        fp({ boxShadow: 'rgb(0, 90, 200) 0px 0px 0px 2px' })
      )
    ).toBe(true);
  });

  it('detects a ring drawn on the ::before pseudo-element', () => {
    expect(
      focusIndicatorChanged(
        fp(),
        fp({ before: 'solid|2px|rgb(0,90,200)|0px|none|""|rgba(0,0,0,0)' })
      )
    ).toBe(true);
  });

  it('detects a border colour change on focus', () => {
    expect(
      focusIndicatorChanged(fp(), fp({ border: '1px|solid|rgb(0, 90, 200)' }))
    ).toBe(true);
  });

  it('does NOT flag a permanent box-shadow that is identical in both states', () => {
    const permanent = fp({ boxShadow: 'rgb(0, 0, 0) 0px 1px 2px 0px' });
    // Same shadow focused and unfocused -> no perceivable focus change -> fail.
    expect(focusIndicatorChanged(permanent, permanent)).toBe(false);
  });
});
