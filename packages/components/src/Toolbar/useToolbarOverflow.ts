import { type RefObject, useCallback, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';

/**
 * Returns how many trailing action buttons fit; the rest collapse into "More".
 *
 * Widths come from a hidden layer that renders every control at its natural
 * width — measuring the live (squished) toolbar would under-report and collapse
 * too late. Two resize observers recalc (each fires on mount): the toolbar for
 * available width, the hidden layer (`w-max`) for the set of controls.
 */
export const useToolbarOverflow = (
  toolbarRef: RefObject<HTMLElement | null>,
  hiddenRef: RefObject<HTMLElement | null>,
  actionCount: number
): number => {
  const [visible, setVisible] = useState(actionCount);

  const calculate = useCallback(() => {
    const toolbar = toolbarRef.current;
    const hidden = hiddenRef.current;
    if (!toolbar || !hidden) return;

    const containerWidth = toolbar.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(toolbar).gap) || 0;
    const width = (el: Element) => el.getBoundingClientRect().width;
    const widthsOf = (selector: string) =>
      Array.from(hidden.querySelectorAll<HTMLElement>(selector)).map(width);

    const pinnedWidths = widthsOf('[data-toolbar-pinned]');
    const actionWidths = widthsOf('[data-toolbar-action]');
    const moreEl = hidden.querySelector<HTMLElement>('[data-toolbar-more]');
    const moreWidth = moreEl ? width(moreEl) : 0;

    const pinnedTotal = pinnedWidths.reduce(
      (sum, w, i) => sum + w + (i > 0 ? gap : 0),
      0
    );
    const hasPinned = pinnedWidths.length > 0;

    // Everything fits → show all actions, no "More".
    const allActions = actionWidths.reduce((sum, w) => sum + w + gap, 0);
    if (pinnedTotal + allActions <= containerWidth) {
      setVisible(actionCount);
      return;
    }

    // Otherwise reserve room for the "More" trigger and fit actions left→right.
    let used = pinnedTotal + (hasPinned ? gap : 0) + moreWidth;
    let count = 0;
    for (const w of actionWidths) {
      const needed = w + gap;
      if (used + needed > containerWidth) break;
      used += needed;
      count++;
    }
    setVisible(count);
  }, [toolbarRef, hiddenRef, actionCount]);

  useResizeObserver({ ref: toolbarRef, onResize: calculate });
  useResizeObserver({ ref: hiddenRef, onResize: calculate });

  return Math.min(visible, actionCount);
};
