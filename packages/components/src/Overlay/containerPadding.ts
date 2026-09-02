// Why this exists
// ---------------
// react-aria keeps a positioned overlay inside its boundary by measuring the
// *visual viewport*. That measurement still counts the gutter reserved by
// `html { scrollbar-gutter: stable }`, while the box that actually clips is
// narrower: `body { overflow-x: clip }` with a visible `html` propagates the
// clip to the viewport, so the clip line is `documentElement.clientWidth`.
// An overlay pinned to the right edge therefore lands inside the gutter and
// gets sliced, losing its border and rounded corner.
//
// `containerPadding` is the only boundary lever react-aria exposes — passing a
// `boundaryElement` hits the same `tagName === 'BODY' || 'HTML'` branch in
// `getContainerDimensions` — so the correction goes there. Upstream fix would
// be for `getContainerDimensions` to clamp `visualViewport.width` to
// `documentElement.clientWidth`; when that lands this module can be deleted.
//
// Note that `containerPadding` is symmetric: it applies to both boundary edges
// and both axes, so the correction also pulls a left-edge overlay inward and
// shortens the available height by the same amount. That is acceptable because
// the overshoot is bounded by the scrollbar width, and 0 whenever react-aria
// is already right.

export const DEFAULT_CONTAINER_PADDING = 12;

/**
 * How far react-aria's viewport measurement overshoots the box that clips.
 * Exported for testing; prefer {@link getContainerPadding}.
 */
export const measureViewportOvershoot = () =>
  Math.max(
    0,
    Math.ceil(
      (window.visualViewport?.width ?? window.innerWidth) -
        document.documentElement.clientWidth
    )
  );

// Reading `clientWidth` forces a layout, and this runs on every render of every
// `<Menu>`/`<Select>`, open or not (one per table row adds up). The overshoot
// only changes when the window does, so cache it against `innerWidth`, which is
// cheap to read and self-invalidating — no resize listener to leak.
let cached: { innerWidth: number; overshoot: number } | undefined;

export const getContainerPadding = () => {
  if (typeof document === 'undefined') return DEFAULT_CONTAINER_PADDING;

  const { innerWidth } = window;
  if (cached?.innerWidth !== innerWidth) {
    cached = { innerWidth, overshoot: measureViewportOvershoot() };
  }

  return DEFAULT_CONTAINER_PADDING + cached.overshoot;
};
