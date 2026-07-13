import { describe, expect, it } from 'vitest';
import {
  type ChildVisibility,
  type OverflowDetection,
  type WrappingDetection,
  isCollapsedVisibleChild,
  isGenuineOverflow,
  isProblematicWrap,
  overflowToValidationIssues,
  wrappingToValidationIssues,
} from './overflow.js';

const makeChild = (
  overrides: Partial<ChildVisibility> = {}
): ChildVisibility => ({
  width: 100,
  height: 40,
  display: 'block',
  visibility: 'visible',
  hasHiddenAttr: false,
  ariaHidden: false,
  ...overrides,
});

const makeWrapping = (
  overrides: Partial<WrappingDetection> = {}
): WrappingDetection => ({
  containerSelector: 'body > div:nth-child(1)',
  rowCount: 2,
  childCount: 5,
  containerWidth: 400,
  totalChildrenWidth: 600,
  isAutoFitGrid: false,
  hasZeroWidthChild: false,
  ...overrides,
});

const makeOverflow = (
  overrides: Partial<OverflowDetection> = {}
): OverflowDetection => ({
  containerSelector: 'body > div:nth-child(1)',
  overflow: 'hidden',
  overflowX: 'hidden',
  overflowY: 'visible',
  childrenOverflowX: true,
  childrenOverflowY: false,
  containerRect: { width: 400, height: 300 },
  paddingBox: { right: 400, bottom: 300 },
  maxChildExtent: { right: 550, bottom: 290 },
  ...overrides,
});

describe('wrappingToValidationIssues', () => {
  it('returns empty array for empty input', () => {
    expect(wrappingToValidationIssues([])).toEqual([]);
  });

  it('produces a warning when wrapping content materially exceeds the container', () => {
    const issues = wrappingToValidationIssues([makeWrapping()]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
  });

  it('message includes row count', () => {
    const issues = wrappingToValidationIssues([makeWrapping({ rowCount: 3 })]);
    expect(issues[0].message).toContain('3 rows');
  });

  it('message includes child count and container width', () => {
    const issues = wrappingToValidationIssues([
      makeWrapping({ childCount: 8, containerWidth: 320 }),
    ]);
    expect(issues[0].message).toContain('8 children');
    expect(issues[0].message).toContain('320px');
  });

  it('type is always spatial', () => {
    const issues = wrappingToValidationIssues([makeWrapping()]);
    expect(issues[0].type).toBe('spatial');
  });

  it('suggestion mentions Columns and Stack', () => {
    const issues = wrappingToValidationIssues([makeWrapping()]);
    expect(issues[0].suggestion).toContain('<Columns');
    expect(issues[0].suggestion).toContain('<Stack>');
  });

  it('handles multiple detections', () => {
    const issues = wrappingToValidationIssues([
      makeWrapping(),
      makeWrapping({ containerSelector: 'body > div:nth-child(2)' }),
    ]);
    expect(issues).toHaveLength(2);
  });

  it('does NOT flag an auto-fit/auto-fill grid that reflows (designed behaviour)', () => {
    // A responsive Tiles-style grid reflows to multiple rows by design.
    const d = makeWrapping({ isAutoFitGrid: true });
    expect(isProblematicWrap(d)).toBe(false);
    expect(wrappingToValidationIssues([d])).toEqual([]);
  });

  it('does NOT flag a flex-wrap that fits (content within container)', () => {
    // Content fits on a single row width-wise; wrapping is intentional reflow.
    const d = makeWrapping({ containerWidth: 400, totalChildrenWidth: 400 });
    expect(isProblematicWrap(d)).toBe(false);
    expect(wrappingToValidationIssues([d])).toEqual([]);
  });

  it('flags a wrap where a child collapsed to zero width even on an auto-fit grid', () => {
    const d = makeWrapping({
      isAutoFitGrid: true,
      hasZeroWidthChild: true,
      totalChildrenWidth: 200,
      containerWidth: 400,
    });
    expect(isProblematicWrap(d)).toBe(true);
    expect(wrappingToValidationIssues([d])).toHaveLength(1);
  });
});

describe('overflowToValidationIssues', () => {
  it('returns empty array for empty input', () => {
    expect(overflowToValidationIssues([])).toEqual([]);
  });

  it('produces a warning for X-axis overflow past the padding box', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({
        overflowX: 'hidden',
        childrenOverflowX: true,
        childrenOverflowY: false,
        paddingBox: { right: 400, bottom: 300 },
        maxChildExtent: { right: 550, bottom: 290 },
      }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
  });

  it('produces a warning for Y-axis overflow past the padding box', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({
        overflowX: 'visible',
        overflowY: 'hidden',
        childrenOverflowX: false,
        childrenOverflowY: true,
        paddingBox: { right: 400, bottom: 300 },
        maxChildExtent: { right: 390, bottom: 450 },
      }),
    ]);
    expect(issues).toHaveLength(1);
  });

  it('message includes container dimensions', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({
        containerRect: { width: 500, height: 200 },
        paddingBox: { right: 500, bottom: 200 },
        maxChildExtent: { right: 700, bottom: 180 },
      }),
    ]);
    expect(issues[0].message).toContain('500x200px');
    expect(issues[0].message).toContain('700x180px');
  });

  it('message includes overflow value', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({ overflow: 'hidden' }),
    ]);
    expect(issues[0].message).toContain('hidden');
  });

  it('type is always spatial', () => {
    const issues = overflowToValidationIssues([makeOverflow()]);
    expect(issues[0].type).toBe('spatial');
  });

  it('suggestion mentions responsive sizing', () => {
    const issues = overflowToValidationIssues([makeOverflow()]);
    expect(issues[0].suggestion).toContain('responsive');
  });

  it('does NOT flag overflow:auto scroll containers (Scrollable)', () => {
    const d = makeOverflow({
      overflow: 'auto',
      overflowX: 'auto',
      overflowY: 'auto',
      childrenOverflowX: false,
      childrenOverflowY: false,
      maxChildExtent: { right: 999, bottom: 999 },
    });
    expect(isGenuineOverflow(d)).toBe(false);
    expect(overflowToValidationIssues([d])).toEqual([]);
  });

  it('does NOT flag overflow:scroll containers (Select popover / Table body)', () => {
    const d = makeOverflow({
      overflow: 'scroll',
      overflowX: 'scroll',
      overflowY: 'scroll',
      childrenOverflowX: false,
      childrenOverflowY: false,
      maxChildExtent: { right: 999, bottom: 999 },
    });
    expect(isGenuineOverflow(d)).toBe(false);
    expect(overflowToValidationIssues([d])).toEqual([]);
  });

  it('does NOT flag a child within the padding-box + tolerance', () => {
    // Child extends 3px past the padding box — within the 4px sub-pixel
    // tolerance, so it is not a genuine clip.
    const d = makeOverflow({
      paddingBox: { right: 400, bottom: 300 },
      maxChildExtent: { right: 403, bottom: 299 },
    });
    expect(isGenuineOverflow(d)).toBe(false);
    expect(overflowToValidationIssues([d])).toEqual([]);
  });

  it('flags a child extending beyond the padding-box tolerance', () => {
    const d = makeOverflow({
      paddingBox: { right: 400, bottom: 300 },
      maxChildExtent: { right: 410, bottom: 299 },
    });
    expect(isGenuineOverflow(d)).toBe(true);
    expect(overflowToValidationIssues([d])).toHaveLength(1);
  });
});

describe('isCollapsedVisibleChild (zero-width-child guard)', () => {
  it('flags a visibly-rendered 0px-wide child (genuine collapse)', () => {
    expect(isCollapsedVisibleChild(makeChild({ width: 0, height: 40 }))).toBe(
      true
    );
  });

  it('does NOT flag a non-zero-width child', () => {
    expect(isCollapsedVisibleChild(makeChild({ width: 120 }))).toBe(false);
  });

  it('does NOT flag a fully collapsed 0x0 (empty/unrendered) child', () => {
    // A conditionally-empty Tiles cell / empty icon slot lays out at 0x0.
    expect(isCollapsedVisibleChild(makeChild({ width: 0, height: 0 }))).toBe(
      false
    );
  });

  it('does NOT flag a display:none child', () => {
    expect(
      isCollapsedVisibleChild(
        makeChild({ width: 0, height: 40, display: 'none' })
      )
    ).toBe(false);
  });

  it('does NOT flag a visibility:hidden child', () => {
    expect(
      isCollapsedVisibleChild(
        makeChild({ width: 0, height: 40, visibility: 'hidden' })
      )
    ).toBe(false);
  });

  it('does NOT flag a [hidden] child', () => {
    expect(
      isCollapsedVisibleChild(
        makeChild({ width: 0, height: 40, hasHiddenAttr: true })
      )
    ).toBe(false);
  });

  it('does NOT flag an aria-hidden child', () => {
    expect(
      isCollapsedVisibleChild(
        makeChild({ width: 0, height: 40, ariaHidden: true })
      )
    ).toBe(false);
  });

  it('a hidden/empty child in an auto-fit grid yields ZERO wrap issues', () => {
    // Idiomatic Marigold Tiles/auto-fit grid with a conditionally-empty (or
    // display:none) cell. None of these children count as a collapse, so the
    // auto-fit exemption holds and no warning is produced.
    const children: ChildVisibility[] = [
      makeChild({ width: 200, height: 80 }),
      makeChild({ width: 0, height: 0 }), // empty cell, never rendered content
      makeChild({ width: 0, height: 40, display: 'none' }), // hidden cell
    ];
    const hasZeroWidthChild = children.some(isCollapsedVisibleChild);
    expect(hasZeroWidthChild).toBe(false);

    const d = makeWrapping({
      isAutoFitGrid: true,
      hasZeroWidthChild,
      totalChildrenWidth: 200,
      containerWidth: 400,
    });
    expect(isProblematicWrap(d)).toBe(false);
    expect(wrappingToValidationIssues([d])).toEqual([]);
  });

  it('a genuinely-collapsed visible child in an auto-fit grid STILL fires', () => {
    const children: ChildVisibility[] = [
      makeChild({ width: 200, height: 80 }),
      makeChild({ width: 0, height: 40 }), // rendered but width-collapsed
    ];
    const hasZeroWidthChild = children.some(isCollapsedVisibleChild);
    expect(hasZeroWidthChild).toBe(true);

    const d = makeWrapping({ isAutoFitGrid: true, hasZeroWidthChild });
    expect(isProblematicWrap(d)).toBe(true);
    expect(wrappingToValidationIssues([d])).toHaveLength(1);
  });
});

describe('isWrappingGrid detection (extractOverflowData logic)', () => {
  it('detects grid wrapping with auto-fill', () => {
    // The extractOverflowData function runs in a browser context, so we test the
    // equivalent logic: a grid container with gridTemplateColumns containing
    // 'auto-fill' should be recognized as a wrapping grid.
    const gridCols = 'repeat(auto-fill, minmax(200px, 1fr))';
    const isAutoFitGrid =
      gridCols.includes('auto-fit') || gridCols.includes('auto-fill');
    expect(isAutoFitGrid).toBe(true);
  });

  it('detects grid wrapping with auto-fit', () => {
    const gridCols = 'repeat(auto-fit, minmax(200px, 1fr))';
    const isAutoFitGrid =
      gridCols.includes('auto-fit') || gridCols.includes('auto-fill');
    expect(isAutoFitGrid).toBe(true);
  });

  it('does not flag static grid template', () => {
    const gridCols = '1fr 1fr 1fr';
    const isAutoFitGrid =
      gridCols.includes('auto-fit') || gridCols.includes('auto-fill');
    expect(isAutoFitGrid).toBe(false);
  });
});
