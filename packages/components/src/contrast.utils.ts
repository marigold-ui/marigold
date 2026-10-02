/**
 * Contrast measurement for story tests that assert a *visual* state carries
 * enough contrast to be perceivable -- focus rings, in particular.
 *
 * Browser-only: reads computed styles and composites through a canvas, so it
 * belongs to the story tests (real browser via Playwright), not to the jsdom
 * unit tests. Kept out of `index.ts`; this is internal test tooling.
 */
import { expect } from 'storybook/test';

/**
 * WCAG 1.4.11: visual information required to identify a state needs 3:1
 * against adjacent colors. A focus indicator is such a state.
 */
export const WCAG_NON_TEXT = 3;

/**
 * Agreed weights for the control edge. A floor, not an equality, so the token
 * can be tuned upward and an unresolved relative color still fails at 1:1. The
 * disabled step is a band: gone below it, still live above.
 */
export const CONTROL_EDGE_MIN = 2.1;
export const DISABLED_EDGE_BAND = [1.3, 2.0] as const;
export const DISABLED_INK_MIN = 1.8;

/**
 * Every painted background from the page down to `element`, bottom layer first.
 * Walked rather than assumed: menu items are transparent, the Menu container is
 * transparent, and the Popover is what actually paints the surface.
 */
export const paintedGround = (element: HTMLElement | null) => {
  const layers: string[] = [];
  for (let node = element; node; node = node.parentElement) {
    const background = getComputedStyle(node).backgroundColor;
    if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') {
      layers.unshift(background);
    }
  }
  return layers;
};

let pixel: CanvasRenderingContext2D | undefined;

/** One 1x1 canvas, made on first use: ~167us per call becomes ~3us reused. */
const surface = () => {
  if (!pixel) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    pixel = canvas.getContext('2d', { willReadFrequently: true })!;
  }

  return pixel;
};

/**
 * Composite the layers onto white and read the pixel back, so alpha, oklch and
 * color-space conversion are resolved by the browser instead of by us.
 */
export const flatten = (layers: readonly string[]) => {
  const context = surface();
  context.fillStyle = '#fff';
  context.fillRect(0, 0, 1, 1);
  for (const layer of layers) {
    context.fillStyle = layer;
    context.fillRect(0, 0, 1, 1);
  }
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return [r!, g!, b!] as const;
};

export const contrast = (a: readonly number[], b: readonly number[]) => {
  const luminance = (rgb: readonly number[]) => {
    const [r, g, b] = rgb.map(value => {
      const channel = value! / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
  };
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high! + 0.05) / (low! + 0.05);
};

/** Contrast of one layer against its ground, both sides flattened. */
export const contrastOn = (ground: readonly string[], layer: string) =>
  contrast(flatten([...ground, layer]), flatten(ground));

/**
 * Contrast of an element's border against what is painted beneath it. Guards
 * the ground walk: an empty stack measures 1:1 against itself.
 */
export const edgeContrast = (element: HTMLElement) => {
  const ground = paintedGround(element.parentElement);

  expect(ground.length).toBeGreaterThan(0);

  return contrastOn(ground, getComputedStyle(element).borderColor);
};

/** Contrast of an element's ink against its own fill, which joins the ground. */
export const inkContrast = (element: HTMLElement) => {
  const ground = paintedGround(element.parentElement);

  expect(ground.length).toBeGreaterThan(0);

  const { backgroundColor, color } = getComputedStyle(element);

  return contrastOn([...ground, backgroundColor], color);
};

/**
 * The inset `box-shadow` layer `ui-state-focus-item` paints, and the color in
 * it. Returns `undefined` for either part that is missing so callers can assert
 * on it with a useful message.
 */
export const insetFocusRing = (element: HTMLElement) => {
  const { boxShadow } = getComputedStyle(element);
  // Split on top-level commas only -- color functions contain their own.
  const ring = boxShadow
    .split(/,(?![^(]*\))/)
    .map(shadow => shadow.trim())
    .find(shadow => shadow.includes('inset'));

  return {
    boxShadow,
    ring,
    color: ring?.match(
      /(?:oklch|oklab|rgba?|color)\([^)]*\)|#[0-9a-f]{3,8}/i
    )?.[0],
  };
};
