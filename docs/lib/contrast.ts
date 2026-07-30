/**
 * Contrast math shared by the token documentation demos.
 *
 * Two models, deliberately both:
 *
 *   - **WCAG 2.x** (`wcagRatio`) is the conformance target. It is what 1.4.3 and
 *     1.4.11 are written against, so it is the number that decides whether a
 *     combination passes.
 *   - **APCA** (`apcaLc`) is the perceptual model developed for WCAG 3. It is
 *     reported alongside because WCAG 2.x is known to over-rate light-on-dark
 *     pairs, which is exactly the case the alpha ramp's second polarity creates.
 *     Where the two disagree, the disagreement is the interesting part.
 *
 * APCA is implemented in full here (0.0.98G-4g / W3 constants). An earlier
 * simplified version lived inline in `contrast-matrix.demo.tsx` and was wrong in
 * three ways that all inflate the score: it omitted the black soft-clamp, it
 * used the normal-polarity exponents for light-on-dark pairs, and it skipped the
 * 0.027 offset. On the charcoal scale that overstated Lc by 2.4–6.6.
 */

export type Rgb = [number, number, number];

/* ------------------------------------------------------------------ *
 * Color conversion
 * ------------------------------------------------------------------ */

/** oklch -> sRGB, channels in 0..255 (unrounded; round only for display). */
export function oklchToRgb(L: number, C: number, hDeg: number): Rgb {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const rLin = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const encode = (c: number) => {
    const abs = Math.abs(c);
    const enc =
      abs > 0.0031308 ? 1.055 * Math.pow(abs, 1 / 2.4) - 0.055 : 12.92 * abs;
    return Math.min(255, Math.max(0, (c < 0 ? -enc : enc) * 255));
  };
  return [encode(rLin), encode(gLin), encode(bLin)];
}

export function rgbToHex(rgb: Rgb) {
  return (
    '#' +
    rgb
      .map(x =>
        Math.max(0, Math.min(255, Math.round(x)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

/**
 * Composite a translucent fill over an opaque backdrop.
 *
 * Done on gamma-encoded channels, which is what a browser does for a
 * `background-color` alpha over an opaque ground — not in linear light. Getting
 * this wrong shifts every ramp figure.
 */
export function compositeOver(fill: Rgb, alpha: number, ground: Rgb): Rgb {
  return fill.map((c, i) => c * alpha + ground[i] * (1 - alpha)) as Rgb;
}

/* ------------------------------------------------------------------ *
 * WCAG 2.x
 * ------------------------------------------------------------------ */

function wcagLuminance([r, g, b]: Rgb) {
  const f = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** WCAG 2.x contrast ratio, 1..21. Symmetric — order does not matter. */
export function wcagRatio(a: Rgb, b: Rgb) {
  const la = wcagLuminance(a);
  const lb = wcagLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* ------------------------------------------------------------------ *
 * APCA — 0.0.98G-4g, W3 constants
 * ------------------------------------------------------------------ */

const APCA = {
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.072175,
  mainTRC: 2.4,
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,
  blkThrs: 0.022,
  blkClmp: 1.414,
  loClip: 0.1,
  deltaYmin: 0.0005,
  scale: 1.14,
  offset: 0.027,
} as const;

/**
 * APCA screen luminance. Note this is a plain 2.4 power curve on each channel,
 * not WCAG's piecewise sRGB transfer function — the two models linearize
 * differently and the values are not interchangeable.
 */
function apcaY([r, g, b]: Rgb) {
  const { sRco, sGco, sBco, mainTRC } = APCA;
  const Y =
    sRco * Math.pow(r / 255, mainTRC) +
    sGco * Math.pow(g / 255, mainTRC) +
    sBco * Math.pow(b / 255, mainTRC);
  // Soft-clamp near black. The charcoal ramp reaches below the 0.022 threshold,
  // so dropping this measurably changes results at the dark end.
  return Y > APCA.blkThrs ? Y : Y + Math.pow(APCA.blkThrs - Y, APCA.blkClmp);
}

/**
 * APCA lightness contrast, signed: positive for dark-on-light ("normal"
 * polarity), negative for light-on-dark ("reverse"). Compare `Math.abs` against
 * the thresholds; the sign only tells you which polarity you are in.
 *
 * Returns 0 when the pair falls under APCA's low clip. That is a real result,
 * not a failure to measure: it means the difference is below the level APCA is
 * willing to call contrast at all.
 */
export function apcaLc(text: Rgb, background: Rgb) {
  const txtY = apcaY(text);
  const bgY = apcaY(background);
  if (Math.abs(bgY - txtY) < APCA.deltaYmin) return 0;

  const { normBG, normTXT, revBG, revTXT, scale, offset, loClip } = APCA;

  if (bgY > txtY) {
    const s = (Math.pow(bgY, normBG) - Math.pow(txtY, normTXT)) * scale;
    return s < loClip ? 0 : (s - offset) * 100;
  }
  const s = (Math.pow(bgY, revBG) - Math.pow(txtY, revTXT)) * scale;
  return s > -loClip ? 0 : (s + offset) * 100;
}

/* ------------------------------------------------------------------ *
 * Thresholds & badges
 * ------------------------------------------------------------------ */

/** WCAG 2.x: 1.4.3 text floors, plus 1.4.11's 3:1 for non-text. */
export const WCAG_LEVEL = { aaa: 7, aa: 4.5, large: 3 } as const;

/**
 * APCA levels. Text: Lc 75 body, Lc 60 sub/secondary, Lc 45 large.
 * Non-text: Lc 30 is the floor for a control or focus indicator, and Lc 15 is
 * the point below which many users will not see the element at all.
 */
export const APCA_LEVEL = {
  body: 75,
  sub: 60,
  large: 45,
  control: 30,
  visible: 15,
} as const;

const SWATCH = {
  strong: 'rgba(16,185,129,0.25)',
  pass: 'rgba(34,197,94,0.25)',
  weak: 'rgba(245,158,11,0.25)',
  fail: 'rgba(239,68,68,0.25)',
} as const;

export function wcagBadgeColor(ratio: number) {
  if (ratio >= WCAG_LEVEL.aaa) return SWATCH.strong;
  if (ratio >= WCAG_LEVEL.aa) return SWATCH.pass;
  if (ratio >= WCAG_LEVEL.large) return SWATCH.weak;
  return SWATCH.fail;
}

export function apcaBadgeColor(lc: number) {
  const score = Math.abs(lc);
  if (score >= APCA_LEVEL.body) return SWATCH.strong;
  if (score >= APCA_LEVEL.sub) return SWATCH.pass;
  if (score >= APCA_LEVEL.large) return SWATCH.weak;
  return SWATCH.fail;
}

/**
 * Badge colors for a *fill* rather than for text. A state wash is meant to sit
 * below the level at which it would read as an indicator, so the scale is
 * inverted from the text one: under Lc 15 is subliminal, Lc 15–30 is the
 * intended band, and Lc 30+ means the wash has grown into a control-strength
 * signal it is not supposed to be (see R7).
 */
export function fillBadgeColor(lc: number) {
  const score = Math.abs(lc);
  if (score >= APCA_LEVEL.control) return SWATCH.fail;
  if (score >= APCA_LEVEL.visible) return SWATCH.pass;
  return SWATCH.weak;
}

/* ------------------------------------------------------------------ *
 * The charcoal scale
 * ------------------------------------------------------------------ */

/** Mirrors `themes/theme-rui/src/tokens.css`. Keep in step with it. */
export const CHARCOAL_STEPS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;

export type CharcoalStep = (typeof CHARCOAL_STEPS)[number];

const CHARCOAL_OKLCH: Record<CharcoalStep, { L: number; C: number }> = {
  '50': { L: 0.985, C: 0.002 },
  '100': { L: 0.965, C: 0.003 },
  '200': { L: 0.92, C: 0.004 },
  '300': { L: 0.86, C: 0.005 },
  '400': { L: 0.74, C: 0.006 },
  '500': { L: 0.62, C: 0.007 },
  '600': { L: 0.52, C: 0.008 },
  '700': { L: 0.42, C: 0.008 },
  '800': { L: 0.32, C: 0.008 },
  '900': { L: 0.22, C: 0.008 },
  '950': { L: 0.15, C: 0.008 },
};

export const CHARCOAL_HUE = 54;

export const charcoal = Object.fromEntries(
  CHARCOAL_STEPS.map(step => {
    const { L, C } = CHARCOAL_OKLCH[step];
    const rgb = oklchToRgb(L, C, CHARCOAL_HUE);
    return [step, { rgb, hex: rgbToHex(rgb) }];
  })
) as Record<CharcoalStep, { rgb: Rgb; hex: string }>;

export const WHITE: Rgb = [255, 255, 255];
