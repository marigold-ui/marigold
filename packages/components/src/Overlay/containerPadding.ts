export const DEFAULT_CONTAINER_PADDING = 12;

/** Width of the box that clips: the viewport's scrollport. */
const measureClipWidth = () => {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;right:0;height:0;visibility:hidden;pointer-events:none';
  document.body.appendChild(probe);
  const { width } = probe.getBoundingClientRect();
  probe.remove();

  return width;
};

/**
 * Width of a classic scrollbar, and so of the gutter one reserves. Measured
 * rather than taken as `window.innerWidth - clipWidth`, which is the same
 * number rounded: `innerWidth` is a whole number, and under browser zoom the
 * real width is fractional. Rounding it away leaves up to a pixel of the
 * overlay outside the clip box — the sliver that reappears at some zoom levels
 * and not others.
 *
 * Zero where the platform draws scrollbars as overlays (macOS by default), and
 * a page that reserves a gutter there reserves nothing.
 *
 * Exported for testing; prefer {@link getContainerPadding}.
 */
export const measureScrollbarWidth = () => {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;width:100px;height:100px;overflow-y:scroll;visibility:hidden;pointer-events:none';
  // Not an inherited property, so the probe would otherwise measure the
  // platform's default width on a page that asked for a thinner scrollbar.
  probe.style.scrollbarWidth = getComputedStyle(
    document.documentElement
  ).scrollbarWidth;

  const content = document.createElement('div');
  probe.appendChild(content);
  document.body.appendChild(probe);
  const width =
    probe.getBoundingClientRect().width - content.getBoundingClientRect().width;
  probe.remove();

  return Math.max(0, width);
};

/**
 * How far react-aria's boundary reaches past the box that clips.
 *
 * react-aria positions an overlay against `visualViewport.width`. A gutter is
 * inside that width but outside the box the page is laid out in, so an overlay
 * pinned to the boundary lands in the gutter and `body { overflow-x: clip }`
 * cuts it off.
 *
 * Which answer is right depends on the state the overlay will be positioned
 * in, and an overlay decides that itself:
 *
 * - One that locks scrolling (every modal overlay) takes the scrollbar off the
 *   screen as it opens, and react-aria replaces it with `scrollbar-gutter:
 *   stable` so the page does not shift. Either way a gutter's width is held
 *   back from the clip box while the boundary grows to the full viewport, so
 *   the overshoot is one scrollbar — whenever something is held back now,
 *   which is the case both when the page reserves a gutter and when a
 *   scrollbar is simply on screen.
 * - One that leaves scrolling alone — a tooltip, a non-modal popover — is
 *   positioned against the page exactly as it stands. A scrollbar that is
 *   really on screen is already outside `visualViewport.width`, so there is
 *   nothing to correct, and only a gutter with no scrollbar in it overshoots.
 *
 * Exported for testing; prefer {@link getContainerPadding}.
 */
export const measureOvershoot = (locksScroll: boolean) => {
  const clipWidth = measureClipWidth();

  if (!locksScroll) {
    const boundary = window.visualViewport?.width ?? window.innerWidth;

    return Math.max(0, boundary - clipWidth);
  }

  return window.innerWidth - clipWidth > 0 ? measureScrollbarWidth() : 0;
};

interface Measurement {
  innerWidth: number;
  boundaryWidth: number;
  overshoot: number;
}

// Measuring forces a layout, and this runs on every render of every
// `<Menu>`/`<Select>`, open or not (one per table row adds up). The answer only
// changes when the viewport does, so cache it against the two widths that
// describe the viewport — both cheap to read and self-invalidating, so there is
// no resize listener to leak.
//
// `visualViewport.width` is in the key because it is what tells the two page
// states apart: it shrinks by a scrollbar's width when one is on screen and
// grows back when an overlay locks scrolling. `innerWidth` is identical in both
// states, so keying on it alone served whichever state happened to be measured
// first to every overlay afterwards — and zooming, which changes `innerWidth`,
// dropped the entry and re-measured in whichever state the page was in by then.
// One slot per answer, so a tooltip and a popover measured in turn do not evict
// each other.
const cached: Record<'locking' | 'passive', Measurement | undefined> = {
  locking: undefined,
  passive: undefined,
};

export interface ContainerPaddingOptions {
  /**
   * Whether the overlay locks page scrolling while it is open, as every modal
   * overlay does. Decides which page state the boundary is measured against.
   * @default true
   */
  locksScroll?: boolean;
}

export const getContainerPadding = ({
  locksScroll = true,
}: ContainerPaddingOptions = {}) => {
  if (typeof document === 'undefined' || !document.body) {
    return DEFAULT_CONTAINER_PADDING;
  }

  const { innerWidth } = window;
  const boundaryWidth = window.visualViewport?.width ?? innerWidth;
  const slot = locksScroll ? 'locking' : 'passive';
  const hit = cached[slot];

  if (hit?.innerWidth !== innerWidth || hit.boundaryWidth !== boundaryWidth) {
    cached[slot] = {
      innerWidth,
      boundaryWidth,
      overshoot: measureOvershoot(locksScroll),
    };
  }

  return DEFAULT_CONTAINER_PADDING + cached[slot]!.overshoot;
};
