import { type RefObject, useCallback, useLayoutEffect, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';

/**
 * Measures how many trailing action buttons fit in the toolbar and returns that
 * count; the remainder collapse into the "More" menu.
 *
 * Pinned controls (fields, separators) are always visible and are measured in
 * place from the live toolbar (its first `pinnedCount` children). Action widths
 * and the "More" trigger width are read from a hidden measurement layer that
 * always renders every action, so collapsing never loses a measurement.
 */
export const useToolbarOverflow = (
  toolbarRef: RefObject<HTMLElement | null>,
  hiddenRef: RefObject<HTMLElement | null>,
  pinnedCount: number,
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

    // Pinned controls are always the first DOM children of the toolbar.
    const children = Array.from(toolbar.children);
    let pinnedWidth = 0;
    for (let i = 0; i < pinnedCount && i < children.length; i++) {
      pinnedWidth += width(children[i]) + (i > 0 ? gap : 0);
    }

    const actionWidths = Array.from(
      hidden.querySelectorAll<HTMLElement>('[data-toolbar-action]')
    ).map(width);
    const moreEl = hidden.querySelector<HTMLElement>('[data-toolbar-more]');
    const moreWidth = moreEl ? width(moreEl) : 0;

    // Everything fits → show all actions, no "More".
    const allActions = actionWidths.reduce((sum, w) => sum + w + gap, 0);
    if (pinnedWidth + allActions <= containerWidth) {
      setVisible(actionCount);
      return;
    }

    // Otherwise reserve room for the "More" trigger and fit actions left→right.
    let used = pinnedWidth + (pinnedCount > 0 ? gap : 0) + moreWidth;
    let count = 0;
    for (const w of actionWidths) {
      const needed = w + gap;
      if (used + needed > containerWidth) break;
      used += needed;
      count++;
    }
    setVisible(count);
  }, [toolbarRef, hiddenRef, pinnedCount, actionCount]);

  useResizeObserver({ ref: toolbarRef, onResize: calculate });

  useLayoutEffect(() => {
    // Defer so the hidden measurement layer is laid out first.
    const id = requestAnimationFrame(calculate);
    return () => cancelAnimationFrame(id);
  }, [calculate]);

  return Math.min(visible, actionCount);
};
