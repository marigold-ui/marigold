import { describe, expect, it } from 'vitest';
import {
  computeWidthUtilization,
  edgeGap,
  responsiveToValidationIssues,
} from './responsive.js';
import type { LayoutBox, ResponsiveSnapshot } from './responsive.js';

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

  it('flags horizontal scroll at mobile as a warning', () => {
    const issues = responsiveToValidationIssues([
      snap('mobile', 375, { horizontalScrollWidth: 500 }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
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

  it('keeps a non-tabular mobile overflow as a warning', () => {
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
    expect(issues[0].severity).toBe('warning');
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

describe('computeWidthUtilization (desktop width usage)', () => {
  // Stacked boxes at (x, width). 10 elements so the >=8 gate passes.
  const stack = (
    x: number,
    width: number,
    n = 10,
    prefix = 'el'
  ): LayoutBox[] =>
    Array.from({ length: n }, (_, i) => ({
      selector: `${prefix}-${i}`,
      x,
      width,
    }));

  it('high utilization, no warning when content spans the viewport', () => {
    // Width 1200 stays just under the full-bleed cutoff (0.95 * 1280 = 1216) so
    // it counts as content; it covers most of the width => no warning.
    const r = computeWidthUtilization(stack(0, 1200), 1280);
    expect(r.ran).toBe(true);
    expect(r.utilization).toBeCloseTo(1200 / 1280, 2);
    expect(r.warning).toBe(false);
  });

  it('low utilization + warning when content is a narrow band (stuck on desktop)', () => {
    // Mirrors the real opus-mcp-stack/P-09 case: content ~0.34 of the width.
    const r = computeWidthUtilization(stack(0, 436), 1280);
    expect(r.ran).toBe(true);
    expect(r.utilization).toBeCloseTo(436 / 1280, 2);
    expect(r.warning).toBe(true);
  });

  it('excludes full-bleed wrappers so they do not mask a narrow band', () => {
    // A full-width body/shell (1280) plus a narrow content column (400) —
    // utilization must reflect the column, not the wrapper.
    const layout = [
      ...stack(0, 1280, 2, 'wrap'), // full-bleed, excluded
      ...stack(0, 400, 10, 'content'),
    ];
    const r = computeWidthUtilization(layout, 1280);
    expect(r.utilization).toBeCloseTo(400 / 1280, 2);
    expect(r.warning).toBe(true);
  });

  it('uses interval union: a right-edge outlier does not fake full width', () => {
    // Narrow column at the left + one button near the right edge. The empty
    // middle is NOT covered, so utilization stays low (union, not min..max).
    const layout = [
      ...stack(0, 400, 9, 'content'),
      { selector: 'btn', x: 1240, width: 40 },
    ];
    const r = computeWidthUtilization(layout, 1280);
    expect(r.utilization).toBeCloseTo((400 + 40) / 1280, 2);
    expect(r.warning).toBe(true);
  });

  it('does not run (no warning) on a trivially small layout', () => {
    const r = computeWidthUtilization(stack(0, 400, 3), 1280);
    expect(r.ran).toBe(false);
    expect(r.warning).toBe(false);
  });
});
