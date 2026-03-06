import { type RefObject, useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';

const MIN_VISIBLE = 2;
export const NULL_REF = { current: null };

/**
 * Starts fully expanded and collapses when the container overflows.
 * Re-expands when the container grows beyond the last overflow width.
 */
export const useAutoCollapse = (
  ref: RefObject<HTMLOListElement | null>,
  totalItems: number
): number => {
  const [state, setState] = useState({ maxVisible: totalItems, totalItems });
  const overflowWidth = useRef<number | null>(null);

  // Reset when item count changes
  if (state.totalItems !== totalItems) {
    setState({ maxVisible: totalItems, totalItems });
  }

  const onResize = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const width = el.clientWidth;

    if (el.scrollWidth > width) {
      overflowWidth.current = width;
      setState(prev => ({
        ...prev,
        maxVisible: Math.max(MIN_VISIBLE, prev.maxVisible - 1),
      }));
    } else if (
      overflowWidth.current === null ||
      width > overflowWidth.current
    ) {
      overflowWidth.current = null;
      setState(prev => ({
        ...prev,
        maxVisible: Math.min(prev.maxVisible + 1, totalItems),
      }));
    }
  }, [ref, totalItems]);

  useResizeObserver({ ref, onResize });

  return state.maxVisible;
};
