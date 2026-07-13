import { describe, expect, it } from 'vitest';
import type { ComponentBounds } from './bounding-box.js';
import { detectOverlaps, overlapIssuesToValidationIssues } from './overlap.js';

const make = (
  component: string,
  selector: string,
  rect: { x: number; y: number; width: number; height: number },
  overrides: Partial<
    Pick<ComponentBounds, 'zIndex' | 'position' | 'role' | 'transform'>
  > = {}
): ComponentBounds => ({
  component,
  selector,
  rect,
  zIndex: overrides.zIndex ?? 0,
  position: overrides.position ?? 'static',
  role: overrides.role ?? null,
  transform: overrides.transform ?? 'none',
  children: [],
});

describe('detectOverlaps', () => {
  it('returns no overlap when boxes are disjoint', () => {
    const a = make('Button', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 100,
      height: 40,
    });
    const b = make('Button', 'body > div:nth-child(1) > b', {
      x: 200,
      y: 0,
      width: 100,
      height: 40,
    });
    expect(detectOverlaps([a, b])).toEqual([]);
  });

  it('flags significant overlap', () => {
    const a = make('Button', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 100,
      height: 40,
    });
    const b = make('Button', 'body > div:nth-child(1) > b', {
      x: 50,
      y: 0,
      width: 100,
      height: 40,
    });
    const issues = detectOverlaps([a, b]);
    expect(issues).toHaveLength(1);
    expect(issues[0].overlapPercentage).toBeGreaterThanOrEqual(5);
  });

  it('ignores ancestor / descendant pairs', () => {
    const parent = make('Card', 'body > div:nth-child(1)', {
      x: 0,
      y: 0,
      width: 200,
      height: 100,
    });
    const child = make('Button', 'body > div:nth-child(1) > a', {
      x: 10,
      y: 10,
      width: 80,
      height: 40,
    });
    expect(detectOverlaps([parent, child])).toEqual([]);
  });

  it('ignores intentional overlay with positioned element and higher z-index', () => {
    const base = make('Card', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 200,
      height: 100,
    });
    const overlay = make(
      'Badge',
      'body > div:nth-child(1) > b',
      { x: 150, y: 0, width: 60, height: 30 },
      {
        position: 'absolute',
        zIndex: 1,
      }
    );
    expect(detectOverlaps([base, overlay])).toEqual([]);
  });

  it('ignores overlay roles like tooltip and dialog', () => {
    const base = make('Button', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 100,
      height: 40,
    });
    const tooltip = make(
      'Tooltip',
      'body > div:nth-child(1) > b',
      { x: 30, y: 0, width: 120, height: 30 },
      {
        role: 'tooltip',
      }
    );
    expect(detectOverlaps([base, tooltip])).toEqual([]);
  });

  it('ignores badge pattern (small element over much larger one)', () => {
    const card = make('Card', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 300,
      height: 200,
    });
    const badge = make('Badge', 'body > div:nth-child(1) > b', {
      x: 270,
      y: 0,
      width: 30,
      height: 20,
    });
    // Badge area = 600, Card area = 60000, ratio = 0.01 < 0.15
    expect(detectOverlaps([card, badge])).toEqual([]);
  });

  it('skips overlap when both elements are positioned', () => {
    const a = make(
      'Popover',
      'body > div:nth-child(1) > a',
      { x: 0, y: 0, width: 100, height: 100 },
      { position: 'absolute' }
    );
    const b = make(
      'Tooltip',
      'body > div:nth-child(1) > b',
      { x: 50, y: 50, width: 100, height: 100 },
      { position: 'absolute' }
    );
    expect(detectOverlaps([a, b])).toEqual([]);
  });

  it('flags overlap between two static elements', () => {
    const a = make(
      'Button',
      'body > div:nth-child(1) > a',
      { x: 0, y: 0, width: 100, height: 40 },
      { position: 'static' }
    );
    const b = make(
      'Button',
      'body > div:nth-child(1) > b',
      { x: 50, y: 0, width: 100, height: 40 },
      { position: 'static' }
    );
    const issues = detectOverlaps([a, b]);
    expect(issues).toHaveLength(1);
    expect(issues[0].overlapPercentage).toBeGreaterThanOrEqual(5);
  });

  it('ignores an element nudged via a non-identity transform (intentional)', () => {
    const anchor = make('Button', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 100,
      height: 40,
    });
    const nudged = make(
      'Badge',
      'body > div:nth-child(1) > b',
      { x: 40, y: 0, width: 100, height: 40 },
      { transform: 'matrix(1, 0, 0, 1, -20, -10)' }
    );
    expect(detectOverlaps([anchor, nudged])).toEqual([]);
  });
});

describe('overlapIssuesToValidationIssues — severity and major flag', () => {
  it('emits a warning for a borderline overlap and marks it as not major', () => {
    const issues = overlapIssuesToValidationIssues([
      {
        componentA: 'Button',
        componentB: 'Button',
        selectorA: 'a',
        selectorB: 'b',
        overlapArea: 400,
        overlapPercentage: 10,
      },
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].details?.major).toBe(false);
  });

  it('keeps a substantial overlap a warning but flags details.major', () => {
    // Overlap is a layout heuristic; per the severity policy it never becomes
    // an error, no matter how large the overlap. The substantial case is only
    // surfaced via details.major.
    const issues = overlapIssuesToValidationIssues([
      {
        componentA: 'Button',
        componentB: 'Button',
        selectorA: 'a',
        selectorB: 'b',
        overlapArea: 2000,
        overlapPercentage: 50,
      },
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].details?.major).toBe(true);
  });
});
