import { describe, expect, it } from 'vitest';
import { edgeGap, responsiveToValidationIssues } from './responsive.js';
import type { ResponsiveSnapshot } from './responsive.js';

const snap = (
  label: string,
  width: number,
  overrides: Partial<ResponsiveSnapshot> = {}
): ResponsiveSnapshot => ({
  breakpoint: { label, width, height: 720 },
  horizontalScrollWidth: width,
  viewportWidth: width,
  touchTargets: [],
  disappearedComponents: [],
  overflowCulprit: null,
  ...overrides,
});

describe('responsiveToValidationIssues', () => {
  it('returns empty for clean snapshots', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375),
      snap('desktop', 1280),
    ]);
    expect(issues).toEqual([]);
  });

  it('flags horizontal scroll at mobile as error', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, { horizontalScrollWidth: 500 }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('error');
    expect(issues[0].source).toBe('responsive-checker');
    expect(issues[0].message).toContain('mobile');
    expect(issues[0].message).toContain('125px');
  });

  it('flags horizontal scroll at tablet as warning', () => {
    const issues = responsiveToValidationIssues([
      snap('tablet', 768, { horizontalScrollWidth: 900 }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
  });

  it('downgrades a tabular overflow culprit to a warning at mobile', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, {
        horizontalScrollWidth: 405,
        overflowCulprit: {
          component: 'table',
          selector: 'table',
          right: 405,
          accessibleName: 'Upcoming events',
          tabular: true,
        },
      }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].suggestion).toContain('Scrollable');
    expect(issues[0].details?.tabular).toBe(true);
  });

  it('keeps a non-tabular mobile overflow as an error', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, {
        horizontalScrollWidth: 500,
        overflowCulprit: {
          component: 'div',
          selector: 'div',
          right: 500,
          accessibleName: '',
          tabular: false,
        },
      }),
    ]);
    expect(issues[0].severity).toBe('error');
  });

  it('ignores horizontal scroll within 1px tolerance', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, { horizontalScrollWidth: 376 }),
    ]);
    expect(issues).toEqual([]);
  });

  it('flags small touch targets at mobile', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, {
        touchTargets: [
          {
            selector: 'button:nth-child(1)',
            component: 'Button',
            role: 'button',
            width: 20,
            height: 20,
          },
        ],
      }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].type).toBe('a11y');
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].message).toContain('20x20');
    expect(issues[0].message).toContain('24x24');
  });

  it('ignores touch targets at desktop', () => {
    const issues = responsiveToValidationIssues([
      snap('desktop', 1280, {
        touchTargets: [
          {
            selector: 'a:nth-child(1)',
            component: 'Link',
            role: 'link',
            width: 20,
            height: 20,
          },
        ],
      }),
    ]);
    expect(issues).toEqual([]);
  });

  it('flags a genuinely collapsed (visible) zero-dimension component', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, {
        disappearedComponents: [
          {
            selector: 'div:nth-child(2)',
            component: 'Card',
            hiddenByCss: false,
          },
        ],
      }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].type).toBe('spatial');
    expect(issues[0].message).toContain('Card');
    expect(issues[0].message).toContain('zero dimensions');
  });

  it('does NOT flag a zero-dimension element hidden via CSS/aria/disclosure', () => {
    // display:none / visibility:hidden / aria-hidden / [hidden] / closed
    // Disclosure / inactive Tab panel all legitimately measure 0x0.
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, {
        disappearedComponents: [
          {
            selector: 'div:nth-child(2)',
            component: 'Disclosure',
            hiddenByCss: true,
          },
          {
            selector: 'div:nth-child(3)',
            component: 'TabPanel',
            hiddenByCss: true,
          },
        ],
      }),
    ]);
    expect(issues).toEqual([]);
  });

  it('accumulates issues across multiple breakpoints', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, { horizontalScrollWidth: 500 }),
      snap('tablet', 768, { horizontalScrollWidth: 900 }),
    ]);
    expect(issues).toHaveLength(2);
    expect(issues[0].message).toContain('mobile');
    expect(issues[1].message).toContain('tablet');
  });
});

describe('edgeGap (WCAG 2.5.8 spacing geometry)', () => {
  const rect = (left: number, top: number, w: number, h: number) => ({
    left,
    top,
    right: left + w,
    bottom: top + h,
  });

  it('is 0 when rects overlap or touch', () => {
    expect(edgeGap(rect(0, 0, 20, 20), rect(10, 0, 20, 20))).toBe(0);
    expect(edgeGap(rect(0, 0, 20, 20), rect(20, 0, 20, 20))).toBe(0);
  });

  it('measures the horizontal edge-to-edge gap, not centre distance', () => {
    // Two 20px-wide targets at x=0 and x=30: centres are 30px apart, but the
    // edges are only 10px apart (30 - 20). Edge gap < 24 => crowded/flagged.
    const a = rect(0, 0, 20, 20);
    const b = rect(30, 0, 20, 20);
    expect(edgeGap(a, b)).toBe(10);
    // Centre distance would be 30 (>=24) and wrongly clear it; edge gap does not.
    expect(edgeGap(a, b)).toBeLessThan(24);
  });

  it('clears targets whose edges are >= the required clearance apart', () => {
    // Same 20px targets but 50px apart => 30px edge gap, clears 24px.
    const a = rect(0, 0, 20, 20);
    const b = rect(50, 0, 20, 20);
    expect(edgeGap(a, b)).toBe(30);
    expect(edgeGap(a, b)).toBeGreaterThanOrEqual(24);
  });
});
