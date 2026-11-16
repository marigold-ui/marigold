import type { RefObject } from 'react';
import { useEffect } from 'react';

const DURATION = 250;
// Ease-out that settles like a critically damped spring.
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Animates the width of an intrinsically sized (`w-max`) element whenever its
 * content changes its size. A `ResizeObserver` tracks the natural width, and on
 * a change the previous width is animated to the new one with the Web
 * Animations API. Overflow is clipped while it runs, so children are cropped
 * instead of squashed. Does nothing under `prefers-reduced-motion`.
 *
 * Resizes that happen while the animation is running are picked up when it
 * finishes, so the animation chains instead of being restarted every frame
 * (the animated width itself triggers the observer).
 */
export const useAnimatedWidth = (ref: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    let width = el.offsetWidth;
    let animation: Animation | undefined;

    const check = () => {
      if (animation) return;

      const prev = width;
      const next = el.offsetWidth;
      width = next;

      if (
        prev === next ||
        typeof el.animate !== 'function' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const frame = { overflow: 'hidden' };
      const anim = el.animate(
        [
          { ...frame, width: `${prev}px` },
          { ...frame, width: `${next}px` },
        ],
        { duration: DURATION, easing: EASING }
      );
      const done = () => {
        animation = undefined;
        check();
      };
      anim.onfinish = done;
      anim.oncancel = () => {
        animation = undefined;
      };
      animation = anim;
    };

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [ref]);
};
