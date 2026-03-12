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

    const containerWidth = container.clientWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;

    const breadcrumbs = Array.from(
      hidden.querySelectorAll<HTMLElement>('[data-hidden-breadcrumb]')
    );
    const ellipsis = hidden.querySelector<HTMLElement>(
      '[data-hidden-ellipsis]'
    );

    // +1 accounts for sub-pixel rounding in offsetWidth
    const widths = breadcrumbs.map(el => el.offsetWidth + 1);
    const ellipsisWidth = ellipsis ? ellipsis.offsetWidth + 1 : 0;

    // Check if everything fits without collapsing
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
    let count = 2; // first + last

    // Add items from the end (before current) while they fit
    for (let i = widths.length - 2; i >= 1; i--) {
      const needed = widths[i] + gap;
      if (used + needed > containerWidth) break;
      used += needed;
      count++;
    }

    setVisibleItems(Math.max(MIN_VISIBLE, count));
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
