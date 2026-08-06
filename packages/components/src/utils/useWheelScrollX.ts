import type { RefObject } from 'react';
import { useEvent } from '@react-aria/utils';

// Module constant so its identity stays stable across renders: `useEvent`
// lists `options` in its effect deps, so an inline object would re-subscribe
// the listener every render. `passive: false` is required for preventDefault.
const WHEEL_OPTS = { passive: false } as const;

// Firefox can report wheel deltas in line units (deltaMode 1) for a physical
// mouse, where deltaY is a small line count. Normalize so one wheel notch
// scrolls a sensible distance everywhere.
const LINE_HEIGHT = 16;

/**
 * Translate a vertical mouse wheel into horizontal scroll on the referenced
 * container so pointer users without a trackpad can reach overflowing content.
 * We only hijack the wheel when the container actually overflows and the
 * gesture is primarily vertical, so a trackpad's native horizontal scroll and
 * normal page scrolling are left untouched. `useEvent` attaches natively (not
 * via React's passive onWheel) so preventDefault works, and keeps the handler
 * current without re-subscribing.
 */
export const useWheelScrollX = (
  scrollRef: RefObject<HTMLElement | null>
): void => {
  useEvent(
    scrollRef,
    'wheel',
    event => {
      const el = scrollRef.current;
      if (!el) {
        return;
      }
      // Let the browser zoom: ctrl+wheel (and trackpad pinch, which the browser
      // reports as ctrl+wheel) must not be hijacked into scroll. Zoom is
      // ctrlKey-only, so metaKey is deliberately not guarded here.
      if (event.ctrlKey) {
        return;
      }
      if (el.scrollWidth <= el.clientWidth) {
        return;
      }
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        return;
      }
      const delta =
        event.deltaMode === 1 ? event.deltaY * LINE_HEIGHT : event.deltaY;
      // Don't trap the wheel at the ends: when there's no room left in the
      // wheel's direction, let the event bubble so the page can scroll past the
      // container instead of swallowing the gesture.
      const max = el.scrollWidth - el.clientWidth;
      if (
        (delta < 0 && el.scrollLeft <= 0) ||
        (delta > 0 && el.scrollLeft >= max)
      ) {
        return;
      }
      event.preventDefault();
      // `behavior: 'instant'` tracks the wheel 1:1. The default `'auto'` defers
      // to the element's CSS `scroll-behavior: smooth`, which starts a fresh
      // animation per notch that snapping keeps interrupting, so rapid notches
      // don't compose and the row scrolls erratically. Smooth scroll is still
      // used for programmatic scroll-into-view.
      el.scrollBy({ left: delta, behavior: 'instant' });
    },
    WHEEL_OPTS
  );
};
