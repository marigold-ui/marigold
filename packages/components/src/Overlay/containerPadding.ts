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
 * The width `scrollbar-gutter` holds back from the box that clips — the amount
 * react-aria's boundary is too wide by once an overlay has locked scrolling.
 * Exported for testing; prefer {@link getContainerPadding}.
 */
export const measureReservedGutter = () =>
  Math.max(0, Math.ceil(window.innerWidth - measureClipWidth()));

// This runs on every render of every `<Menu>`/`<Select>`, open or not (one per
// table row adds up), and the measurement forces a layout. The gutter only
// changes when the window does, so cache it against `innerWidth`, which is
// cheap to read and self-invalidating — no resize listener to leak.
let cached: { innerWidth: number; gutter: number } | undefined;

export const getContainerPadding = () => {
  if (typeof document === 'undefined' || !document.body) {
    return DEFAULT_CONTAINER_PADDING;
  }

  const { innerWidth } = window;
  if (cached?.innerWidth !== innerWidth) {
    cached = { innerWidth, gutter: measureReservedGutter() };
  }

  return DEFAULT_CONTAINER_PADDING + cached.gutter;
};
