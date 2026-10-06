import { type RefObject, useCallback, useLayoutEffect, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';

const MIN_VISIBLE = 2;

/**
 * Measures hidden breadcrumb items in one pass to determine
 * how many fit within the container width.
 */
export const useAutoCollapse = (
  containerRef: RefObject<HTMLOListElement | null>,
  hiddenRef: RefObject<HTMLDivElement | null>,
  totalItems: number
): number => {
  const [visibleItems, setVisibleItems] = useState(totalItems);

  const calculate = useCallback(() => {
    const container = containerRef.current;
    const hidden = hiddenRef.current;
    if (!container || !hidden) return;

    const containerWidth = container.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;

    const breadcrumbs = Array.from(
      hidden.querySelectorAll<HTMLElement>('[data-hidden-breadcrumb]')
    );
    const ellipsis = hidden.querySelector<HTMLElement>(
      '[data-hidden-ellipsis]'
    );

    const widths = breadcrumbs.map(el => el.getBoundingClientRect().width);
    const ellipsisWidth = ellipsis ? ellipsis.getBoundingClientRect().width : 0;

    const totalWidth = widths.reduce(
      (sum, w, i) => sum + w + (i > 0 ? gap : 0),
      0
    );
    if (totalWidth <= containerWidth) {
      setVisibleItems(totalItems);
      return;
    }

    // Start with first + ellipsis + current (last), then try adding more
    const firstWidth = widths[0];
    const lastWidth = widths[widths.length - 1];
    let used = firstWidth + gap + ellipsisWidth + gap + lastWidth;

    // If even first + ellipsis + last doesn't fit, show only [ellipsis, last]
    if (used > containerWidth) {
      setVisibleItems(MIN_VISIBLE);
      return;
    }

    // count tracks real items (first + last + any extras from the loop)
    let count = 2;

    // Add items from the end (before current) while they fit
    for (let i = widths.length - 2; i >= 1; i--) {
      const needed = widths[i] + gap;
      if (used + needed > containerWidth) break;
      used += needed;
      count++;
    }

    // +1 because the component displays count real items PLUS the ellipsis.
    //
    // Clamped below `totalItems`: we only get here because the full trail does
    // not fit, so the component has to collapse. It decides that with
    // `total > maxVisibleItems`, and a slot count equal to `totalItems` reads
    // as "everything fits" there — it would then render every real item at
    // full width and overflow, because the ellipsis a slot stands for is
    // narrower than the crumb it replaces.
    //
    // ponytail: costs one crumb that would have fit (it moves under the
    // ellipsis instead). Returning the real-item count plus a separate
    // "collapsed" flag would keep it, at the price of threading that flag
    // through the slice math in Breadcrumbs.
    setVisibleItems(Math.min(count + 1, totalItems - 1));
  }, [containerRef, hiddenRef, totalItems]);

  useResizeObserver({ ref: containerRef, onResize: calculate });

  useLayoutEffect(() => {
    if (totalItems > 0) {
      // Defer to allow the hidden measurement div to be laid out first
      const id = requestAnimationFrame(calculate);
      return () => cancelAnimationFrame(id);
    }
  }, [totalItems, calculate]);

  return visibleItems;
};
