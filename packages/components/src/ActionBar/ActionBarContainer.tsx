import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';

export interface ActionBarContainerProps {
  /**
   * The selectable collection (Table, ListBox, etc.).
   */
  children: ReactNode;

  /**
   * The ActionBar element to position at the bottom of the container.
   */
  actionBar?: ReactNode;
}

/**
 * Wraps a selectable collection and an ActionBar, positioning the ActionBar
 * at the bottom of the container with proper overflow clipping and scroll padding.
 */
export const ActionBarContainer = ({
  children,
  actionBar,
}: ActionBarContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [actionBarHeight, setActionBarHeight] = useState(0);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  // Measure ActionBar height and set CSS custom property
  const actionBarRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setActionBarHeight(node.offsetHeight);
    } else {
      setActionBarHeight(0);
    }
  }, []);

  // Observe scrollbar width of the scrollable child
  const scrollableRef = useRef<Element | null>(null);

  const updateScrollbarWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    // Find the scrollable child (ResizableTableContainer or similar)
    const scrollable =
      el.querySelector('[class*="overflow"]') ||
      el.querySelector('[style*="overflow"]') ||
      el.firstElementChild;

    if (scrollable && scrollable instanceof HTMLElement) {
      scrollableRef.current = scrollable;
      const width = scrollable.clientWidth
        ? scrollable.offsetWidth - scrollable.clientWidth
        : 0;
      setScrollbarWidth(width);
    }
  }, []);

  useResizeObserver({ ref: containerRef, onResize: updateScrollbarWidth });

  const style: CSSProperties & Record<string, string> = {
    '--action-bar-height': actionBarHeight ? `${actionBarHeight}px` : '0px',
  };

  return (
    <div ref={containerRef} className="relative overflow-clip" style={style}>
      {children}

      {actionBar && (
        <div
          ref={actionBarRef}
          className="absolute inset-x-0 bottom-0 flex justify-center"
          style={{ insetInlineEnd: scrollbarWidth || undefined }}
        >
          {actionBar}
        </div>
      )}
    </div>
  );
};
