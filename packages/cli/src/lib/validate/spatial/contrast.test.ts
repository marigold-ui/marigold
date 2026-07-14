import { describe, expect, it } from 'vitest';
import {
  type RGBA,
  compositeOver,
  contrastAgainstLayers,
  contrastRatio,
  flattenBackground,
  parseColor,
  relativeLuminance,
} from './contrast.js';

describe('parseColor', () => {
  it('parses rgb()', () => {
    expect(parseColor('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
  it('parses rgba() with alpha', () => {
    expect(parseColor('rgba(0, 0, 0, 0.5)')).toEqual({
      r: 0,
      g: 0,
      b: 0,
      a: 0.5,
    });
  });
  it('parses the space / slash form', () => {
    expect(parseColor('rgb(10 20 30 / 0.4)')).toEqual({
      r: 10,
      g: 20,
      b: 30,
      a: 0.4,
    });
  });
  it('parses a percentage alpha in the space / slash form', () => {
    // Browsers can emit `rgb(r g b / 50%)`; a bare parseFloat on "50%" would
    // yield 50 instead of 0.5, which then clamps to fully opaque downstream.
    expect(parseColor('rgb(0 0 0 / 50%)')).toEqual({
      r: 0,
      g: 0,
      b: 0,
      a: 0.5,
    });
  });
  it('parses #rrggbb', () => {
    expect(parseColor('#ff8800')).toEqual({ r: 255, g: 136, b: 0, a: 1 });
  });
  it('parses #rgb shorthand', () => {
    expect(parseColor('#f80')).toEqual({ r: 255, g: 136, b: 0, a: 1 });
  });
  it('parses #rrggbbaa', () => {
    const c = parseColor('#00000080');
    expect(c?.r).toBe(0);
    expect(c?.a).toBeCloseTo(0.5, 1);
  });
  it('parses the transparent keyword', () => {
    expect(parseColor('transparent')).toEqual({ r: 0, g: 0, b: 0, a: 0 });
  });
  it('returns null for gradients and unknown syntaxes (indeterminate)', () => {
    expect(parseColor('linear-gradient(red, blue)')).toBeNull();
    expect(parseColor('color(srgb 1 0 0)')).toBeNull();
    expect(parseColor('currentColor')).toBeNull();
    expect(parseColor('')).toBeNull();
  });
});

describe('relativeLuminance', () => {
  it('is 1 for white and 0 for black', () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 5);
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 5);
  });
});

describe('contrastRatio', () => {
  it('is 21 for black on white', () => {
    expect(
      contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })
    ).toBeCloseTo(21, 1);
  });
  it('is 1 for identical colours', () => {
    expect(
      contrastRatio({ r: 50, g: 50, b: 50 }, { r: 50, g: 50, b: 50 })
    ).toBe(1);
  });
  it('is symmetric', () => {
    const a = { r: 10, g: 80, b: 200 };
    const b = { r: 240, g: 240, b: 240 };
    expect(contrastRatio(a, b)).toBeCloseTo(contrastRatio(b, a), 6);
  });
});

describe('compositeOver', () => {
  it('returns the foreground when fully opaque', () => {
    expect(
      compositeOver({ r: 10, g: 20, b: 30, a: 1 }, { r: 255, g: 255, b: 255 })
    ).toEqual({ r: 10, g: 20, b: 30 });
  });
  it('returns the backdrop when fully transparent', () => {
    expect(
      compositeOver({ r: 10, g: 20, b: 30, a: 0 }, { r: 255, g: 255, b: 255 })
    ).toEqual({ r: 255, g: 255, b: 255 });
  });
  it('blends at 50%', () => {
    expect(
      compositeOver({ r: 0, g: 0, b: 0, a: 0.5 }, { r: 255, g: 255, b: 255 })
    ).toEqual({ r: 128, g: 128, b: 128 });
  });
});

describe('flattenBackground', () => {
  const a = (r: number, g: number, b: number, alpha: number): RGBA => ({
    r,
    g,
    b,
    a: alpha,
  });

  it('returns the single opaque layer', () => {
    expect(flattenBackground([a(255, 255, 255, 1)])).toEqual({
      r: 255,
      g: 255,
      b: 255,
    });
  });
  it('composites a translucent top layer over an opaque base below it', () => {
    // top = 50% black, bottom = white -> grey.
    expect(flattenBackground([a(0, 0, 0, 0.5), a(255, 255, 255, 1)])).toEqual({
      r: 128,
      g: 128,
      b: 128,
    });
  });
  it('returns null when no layer is opaque (indeterminate backdrop)', () => {
    expect(flattenBackground([a(0, 0, 0, 0), a(10, 10, 10, 0.2)])).toBeNull();
  });
});

describe('contrastAgainstLayers', () => {
  it('measures a dark border against a white page', () => {
    const res = contrastAgainstLayers({ r: 0, g: 0, b: 0, a: 1 }, [
      { r: 255, g: 255, b: 255, a: 1 },
    ]);
    expect(res?.ratio).toBeCloseTo(21, 1);
  });
  it('flags a near-invisible light-grey border on white (< 3:1)', () => {
    const res = contrastAgainstLayers({ r: 235, g: 235, b: 235, a: 1 }, [
      { r: 255, g: 255, b: 255, a: 1 },
    ]);
    expect(res).not.toBeNull();
    expect(res!.ratio).toBeLessThan(3);
  });
  it('returns null when the background is indeterminate', () => {
    expect(
      contrastAgainstLayers({ r: 0, g: 0, b: 0, a: 1 }, [
        { r: 0, g: 0, b: 0, a: 0 },
      ])
    ).toBeNull();
  });
  it('returns null for a fully transparent foreground', () => {
    expect(
      contrastAgainstLayers({ r: 0, g: 0, b: 0, a: 0 }, [
        { r: 255, g: 255, b: 255, a: 1 },
      ])
    ).toBeNull();
  });
});
