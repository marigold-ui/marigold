// Why this exists
// ---------------
// react-aria keeps a positioned overlay inside its boundary by measuring the
// *visual viewport*. When `html { scrollbar-gutter: stable }` reserves a gutter
// but no scrollbar is actually rendered, that measurement is wider than the box
// the page is laid out in and clipped by, so an overlay pinned to the right
// edge lands inside the gutter and gets sliced — losing its border and rounded
// corner. `body { overflow-x: clip }` is what makes it a hard cut rather than a
// scroll.
//
// `containerPadding` is the only boundary lever react-aria exposes — passing a
// `boundaryElement` hits the same `tagName === 'BODY' || 'HTML'` branch in
// `getContainerDimensions` — so the correction goes there. The upstream fix
// would be for `getContainerDimensions` to clamp its width to the box that
// clips; when that lands this module can be deleted.
//
// Note that `containerPadding` is symmetric: it applies to both boundary edges
// and both axes, so the correction also pulls a left-edge overlay inward and
// shortens the available height by the same amount. That is acceptable because
// the overshoot is bounded by the scrollbar width, and 0 whenever react-aria is
// already right.
//
// Measuring the clip line
// ---------------
// Three candidates, measured in Chrome 1280px wide with a 15px gutter, against
// where an absolutely positioned child actually stops being painted:
//
//   config                        | true clip | body.right | clientWidth | fixed
//   ------------------------------|-----------|------------|-------------|------
//   gutter, no scrollbar rendered |      1265 |       1265 |      *1280* |  1265
//   gutter, scrollbar rendered    |      1265 |       1265 |        1265 |  1265
//   no gutter, body margin 100    |      1280 |     *1180* |        1280 |  1280
//   gutter + body margin 100      |      1265 |     *1165* |      *1280* |  1265
//   gutter + html margin 50       |      1265 |     *1215* |      *1280* |  1265
//
// `body.right` is wrong wherever the body (or html) carries a margin: the clip
// propagates from the body to the viewport, so the body's own box does not clip
// — a child renders past it all the way to the viewport edge.
//
// `documentElement.clientWidth` is wrong in the case this fix is *about*:
// Chrome only subtracts a scrollbar it actually renders, so a reserved but
// unused gutter narrows the layout without narrowing `clientWidth`.
//
// What does hold in every case is the fixed-positioning containing block, which
// is the viewport's scrollport — the box that clips. Measuring it costs a
// throwaway element, which is why the result is cached.

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
 * How far react-aria's viewport measurement overshoots the box that clips.
 * Exported for testing; prefer {@link getContainerPadding}.
 */
export const measureViewportOvershoot = () =>
  Math.max(
    0,
    Math.ceil(
      (window.visualViewport?.width ?? window.innerWidth) - measureClipWidth()
    )
  );

// This runs on every render of every `<Menu>`/`<Select>`, open or not (one per
// table row adds up), and the measurement forces a layout. The overshoot only
// changes when the window does, so cache it against `innerWidth`, which is
// cheap to read and self-invalidating — no resize listener to leak.
let cached: { innerWidth: number; overshoot: number } | undefined;

export const getContainerPadding = () => {
  if (typeof document === 'undefined' || !document.body) {
    return DEFAULT_CONTAINER_PADDING;
  }

  const { innerWidth } = window;
  if (cached?.innerWidth !== innerWidth) {
    cached = { innerWidth, overshoot: measureViewportOvershoot() };
  }

  return DEFAULT_CONTAINER_PADDING + cached.overshoot;
};
