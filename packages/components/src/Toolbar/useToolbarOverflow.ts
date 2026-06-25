import { type RefObject, useCallback, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';

/**
 * Returns how many action buttons fit in the given container; the rest collapse
 * into the "More" menu.
 *
 * Widths come from a hidden layer that renders every action at its natural width
 * — measuring the live (squished) row would under-report and collapse too late.
 * Two resize observers recalc (each fires on mount): the container for available
 * width, the hidden layer (`w-max`) for the set of actions.
 */
export const useToolbarOverflow = (
  containerRef: RefObject<HTMLElement | null>,
  hiddenRef: RefObject<HTMLElement | null>,
  actionCount: number
): number => {
  const [visible, setVisible] = useState(actionCount);

  const calculate = useCallback(() => {
    const container = containerRef.current;
    const hidden = hiddenRef.current;
    if (!container || !hidden) return;

    const containerWidth = container.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;
    const width = (el: Element) => el.getBoundingClientRect().width;
    const actionWidths = Array.from(
      hidden.querySelectorAll<HTMLElement>('[data-toolbar-action]')
    ).map(width);
    const moreEl = hidden.querySelector<HTMLElement>('[data-toolbar-more]');
    const moreWidth = moreEl ? width(moreEl) : 0;

    // Everything fits → show all actions, no "More".
    const allActions = actionWidths.reduce((sum, w) => sum + w + gap, 0);
    if (allActions <= containerWidth) {
      setVisible(actionCount);
      return;
    }

    // Otherwise reserve room for the "More" trigger and fit actions left→right.
    let used = moreWidth;
    let count = 0;
    for (const w of actionWidths) {
      const needed = w + gap;
      if (used + needed > containerWidth) break;
      used += needed;
      count++;
    }
    setVisible(count);
  }, [containerRef, hiddenRef, actionCount]);

  useResizeObserver({ ref: containerRef, onResize: calculate });
  useResizeObserver({ ref: hiddenRef, onResize: calculate });

  return Math.min(visible, actionCount);
};
