import { describe, expect, it } from 'vitest';
import type { ComponentBounds } from './bounding-box.js';
import { detectOverlaps } from './overlap.js';

const make = (
  component: string,
  selector: string,
  rect: { x: number; y: number; width: number; height: number },
  overrides: Partial<Pick<ComponentBounds, 'zIndex' | 'position' | 'role'>> = {}
): ComponentBounds => ({
  component,
  selector,
  rect,
  zIndex: overrides.zIndex ?? 0,
  position: overrides.position ?? 'static',
  role: overrides.role ?? null,
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

  it('skips overlap for badge pattern (small on large)', () => {
    const large = make('Card', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 500,
      height: 500,
    });
    const small = make('Badge', 'body > div:nth-child(1) > b', {
      x: 490,
      y: 0,
      width: 10,
      height: 10,
    });
    // small area = 100, large area = 250000, ratio = 0.0004 < 0.15
    expect(detectOverlaps([large, small])).toEqual([]);
  });

  it('skips overlap for tooltip role', () => {
    const button = make('Button', 'body > div:nth-child(1) > a', {
      x: 0,
      y: 0,
      width: 100,
      height: 40,
    });
    const tip = make(
      'Tooltip',
      'body > div:nth-child(1) > b',
      { x: 20, y: 10, width: 80, height: 30 },
      { role: 'tooltip' }
    );
    expect(detectOverlaps([button, tip])).toEqual([]);
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
});
