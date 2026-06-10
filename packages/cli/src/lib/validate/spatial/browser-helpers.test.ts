import { describe, expect, it } from 'vitest';
import {
  type Rectish,
  buildInstallScript,
  edgeGapRect,
  intersectionArea,
  rectArea,
} from './browser-helpers.js';

const r = (x: number, y: number, width: number, height: number): Rectish => ({
  x,
  y,
  width,
  height,
});

describe('rectArea', () => {
  it('multiplies width by height', () => {
    expect(rectArea(r(0, 0, 4, 5))).toBe(20);
  });
  it('is zero for a zero-dimension rect', () => {
    expect(rectArea(r(10, 10, 0, 30))).toBe(0);
  });
});

describe('intersectionArea', () => {
  it('returns 0 for disjoint rects', () => {
    expect(intersectionArea(r(0, 0, 10, 10), r(20, 20, 10, 10))).toBe(0);
  });
  it('returns 0 for rects that only touch on an edge', () => {
    expect(intersectionArea(r(0, 0, 10, 10), r(10, 0, 10, 10))).toBe(0);
  });
  it('computes the overlapping area', () => {
    // Overlap region is x:[5,10] y:[5,10] = 5x5 = 25.
    expect(intersectionArea(r(0, 0, 10, 10), r(5, 5, 10, 10))).toBe(25);
  });
  it('handles full containment', () => {
    expect(intersectionArea(r(0, 0, 10, 10), r(2, 2, 4, 4))).toBe(16);
  });
});

describe('edgeGapRect', () => {
  it('is 0 when rects overlap', () => {
    expect(edgeGapRect(r(0, 0, 10, 10), r(5, 5, 10, 10))).toBe(0);
  });
  it('is 0 when rects touch', () => {
    expect(edgeGapRect(r(0, 0, 10, 10), r(10, 0, 10, 10))).toBe(0);
  });
  it('measures the horizontal edge gap', () => {
    // b starts at x=18, a ends at x=10 -> gap 8 on x, aligned on y.
    expect(edgeGapRect(r(0, 0, 10, 10), r(18, 0, 10, 10))).toBe(8);
  });
  it('measures the diagonal (euclidean) gap', () => {
    // gapX = 3 (a right edge 10, b left 13), gapY = 4 (a bottom 10, b top 14).
    expect(edgeGapRect(r(0, 0, 10, 10), r(13, 14, 10, 10))).toBeCloseTo(5);
  });
});

describe('buildInstallScript', () => {
  const script = buildInstallScript();
  it('assigns onto window.__mv', () => {
    expect(script).toContain('window.__mv');
  });
  it('serializes each shared helper by name', () => {
    for (const name of [
      'cssPath',
      'describeEl',
      'isHidden',
      'rectArea',
      'intersectionArea',
      'edgeGapRect',
      'focusFingerprint',
    ]) {
      expect(script).toContain(`${name}:`);
    }
  });
  it('produces a self-contained string with no module references', () => {
    // A serialized helper must not reference an import or module-scope binding;
    // the cheapest proxy is that the script does not contain an import keyword.
    expect(script).not.toContain('import ');
    expect(script).not.toContain('require(');
  });
});
