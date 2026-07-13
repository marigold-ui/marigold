/**
 * Deterministic colour-contrast engine (pure, Node-testable).
 *
 * Used by the WCAG 1.4.11 Non-text Contrast check and the 2.4.7 focus-visible
 * diff. Everything here is intentionally FP-safe: any colour that cannot be
 * resolved to a concrete sRGB value (gradients, background images,
 * `currentColor`, unknown syntaxes) parses to `null`, and a contrast result of
 * `null` means "indeterminate — do not report", never a failure.
 *
 * Pure functions only; no DOM, no imports. The browser extractor reads raw
 * computed colour strings and hands them here.
 */

export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { a: number };

const clamp255 = (n: number): number => Math.max(0, Math.min(255, n));

const NAMED: Record<string, RGBA> = {
  transparent: { r: 0, g: 0, b: 0, a: 0 },
  black: { r: 0, g: 0, b: 0, a: 1 },
  white: { r: 255, g: 255, b: 255, a: 1 },
};

/**
 * Parses the colour syntaxes a browser actually emits from getComputedStyle:
 * `rgb(r, g, b)`, `rgba(r, g, b, a)`, the space form `rgb(r g b / a)`, `#rgb`,
 * `#rrggbb`, `#rrggbbaa`, and the keywords transparent/black/white. Anything
 * else (gradients, `color(srgb …)`, named colours beyond the trivial set,
 * `currentColor`) returns null so the caller treats it as indeterminate.
 */
export const parseColor = (input: string): RGBA | null => {
  const value = input.trim().toLowerCase();
  if (!value) return null;
  if (value in NAMED) return { ...NAMED[value] };

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    const expand = (s: string): number => parseInt(s + s, 16);
    if (hex.length === 3) {
      return { r: expand(hex[0]), g: expand(hex[1]), b: expand(hex[2]), a: 1 };
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
      if ([r, g, b].some(Number.isNaN)) return null;
      return { r, g, b, a };
    }
    return null;
  }

  const m = value.match(/^rgba?\(([^)]+)\)$/);
  if (!m) return null;
  // Accept both "r, g, b, a" and "r g b / a".
  const parts = m[1]
    .replace('/', ' ')
    .split(/[\s,]+/)
    .filter(Boolean);
  if (parts.length < 3) return null;
  const channel = (s: string): number =>
    s.endsWith('%') ? (parseFloat(s) / 100) * 255 : parseFloat(s);
  const r = channel(parts[0]);
  const g = channel(parts[1]);
  const b = channel(parts[2]);
  const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
  if ([r, g, b, a].some(Number.isNaN)) return null;
  return { r: clamp255(r), g: clamp255(g), b: clamp255(b), a };
};

/** WCAG relative luminance of an opaque sRGB colour. */
export const relativeLuminance = (c: RGB): number => {
  const lin = (v: number): number => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
};

/** WCAG contrast ratio between two opaque colours (1..21). */
export const contrastRatio = (a: RGB, b: RGB): number => {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
};

/** Alpha-composites a (possibly translucent) colour over an opaque backdrop. */
export const compositeOver = (fg: RGBA, bg: RGB): RGB => {
  const a = Math.max(0, Math.min(1, fg.a));
  return {
    r: Math.round(fg.r * a + bg.r * (1 - a)),
    g: Math.round(fg.g * a + bg.g * (1 - a)),
    b: Math.round(fg.b * a + bg.b * (1 - a)),
  };
};

/**
 * Flattens a stack of background layers into a single opaque colour.
 *
 * `layers` are ordered TOP first (the element's own background) to BOTTOM last
 * (outermost ancestor / page). Compositing starts at the first fully-opaque
 * layer scanning from the bottom up and composites everything above it. If no
 * layer is opaque the true backdrop is unknown -> null (indeterminate), so the
 * caller does not invent a white page and produce a false contrast number.
 */
export const flattenBackground = (layers: RGBA[]): RGB | null => {
  const bottomUp = [...layers].reverse();
  let base: RGB | null = null;
  for (const layer of bottomUp) {
    if (base === null) {
      if (layer.a >= 1) base = { r: layer.r, g: layer.g, b: layer.b };
      // Skip translucent layers until we find the opaque base beneath them.
    } else {
      base = compositeOver(layer, base);
    }
  }
  return base;
};

export type ContrastResult = {
  ratio: number;
  foreground: RGB;
  background: RGB;
};

/**
 * Contrast of a (possibly translucent) foreground colour against a stack of
 * background layers. Returns null when either side is indeterminate.
 */
export const contrastAgainstLayers = (
  foreground: RGBA,
  backgroundLayers: RGBA[]
): ContrastResult | null => {
  const bg = flattenBackground(backgroundLayers);
  if (!bg) return null;
  // A fully transparent foreground has no boundary to assess.
  if (foreground.a <= 0) return null;
  const fg = compositeOver(foreground, bg);
  return { ratio: contrastRatio(fg, bg), foreground: fg, background: bg };
};

/** WCAG 1.4.11 threshold for UI components and graphical objects. */
export const NON_TEXT_CONTRAST_MIN = 3;
