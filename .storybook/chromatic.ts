/** Whether the story runs in Chromatic, detected like Chromatic's `isChromatic()`. */
export const isChromatic =
  /Chromatic/.test(navigator.userAgent) || /chromatic=true/.test(location.href);

/**
 * `beforeEach` for stories that open a sheet (Tray, trays on small screens and
 * the mobile Sidebar drawer).
 *
 * Chromatic resizes the window while capturing, which can push an open sheet out
 * of view, and RAC's Sheet closes once it is out of view. Only reports right after
 * a resize are dropped, so swipes and exits (RAC's exit waits for one) still close.
 * The resize also leaves the sheet scrolled off-screen, so open ones are put back
 * at rest: the bottom of their scroller.
 *
 * Runs before the story renders, so RAC builds its observer from the patched
 * class, and the cleanup restores the browser's own for the next story.
 */
export const keepSheetsOpenInChromatic = () => {
  if (!isChromatic) return;

  let resizedAt = -Infinity;
  const onResize = () => {
    resizedAt = performance.now();
    requestAnimationFrame(() => {
      for (const scroller of document.querySelectorAll('[data-sheet-scroll]')) {
        if (scroller.closest('[data-exiting]')) continue;
        // RAC rests a sheet at the end of its scroller, except one that exits
        // toward the left, which rests at scroll 0 (a start sheet in LTR).
        const swipe = scroller
          .closest('[data-swipe-direction]')
          ?.getAttribute('data-swipe-direction');
        if (swipe === 'left') scroller.scrollLeft = 0;
        else if (swipe === 'right') scroller.scrollLeft = scroller.scrollWidth;
        else scroller.scrollTop = scroller.scrollHeight;
      }
    });
  };
  window.addEventListener('resize', onResize);

  const NativeIntersectionObserver = window.IntersectionObserver;
  window.IntersectionObserver = class extends NativeIntersectionObserver {
    constructor(
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      super((entries, observer) => {
        const kept = entries.filter(
          entry =>
            !entry.target.hasAttribute('data-sheet-content') ||
            entry.intersectionRatio > 0 ||
            entry.target.closest('[data-exiting]') ||
            performance.now() - resizedAt > 1000
        );
        if (kept.length) callback(kept, observer);
      }, options);
    }
  };

  return () => {
    window.removeEventListener('resize', onResize);
    window.IntersectionObserver = NativeIntersectionObserver;
  };
};
