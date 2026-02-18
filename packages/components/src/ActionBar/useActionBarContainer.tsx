import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';
import type { Selection } from '../types';
import { ActionBarContext } from './ActionBarContext';
import { useActionBarTrigger } from './useActionBarTrigger';

export interface UseActionBarContainerProps {
  /**
   * The controlled set of selected keys.
   */
  selectedKeys?: Selection;

  /**
   * The initial selected keys (uncontrolled).
   */
  defaultSelectedKeys?: Selection;

  /**
   * Handler called when the selection changes.
   */
  onSelectionChange?: (keys: Selection) => void;

  /**
   * Render function that receives the current selection and returns an ActionBar element.
   * When provided, the Table will manage selection wiring automatically.
   */
  actionBar?: (selectedKeys: Selection) => ReactNode;
}

export interface UseActionBarContainerReturn {
  /** Pass to Table's `selectedKeys` prop. */
  selectedKeys: Selection;

  /** Pass to Table's `onSelectionChange` prop. */
  onSelectionChange: (keys: Selection) => void;

  /** Measured height of the ActionBar in pixels. */
  actionBarHeight: number;

  /** Wraps children in the positioning container with the ActionBar overlay. */
  renderContainerWithActionBar: (children: ReactNode) => ReactNode;
}

export const useActionBarContainer = ({
  selectedKeys: controlledKeys,
  defaultSelectedKeys,
  onSelectionChange,
  actionBar,
}: UseActionBarContainerProps): UseActionBarContainerReturn => {
  const trigger = useActionBarTrigger({
    selectedKeys: controlledKeys,
    defaultSelectedKeys,
    onSelectionChange,
  });

  const [actionBarHeight, setActionBarHeight] = useState(0);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const actionBarRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setActionBarHeight(node.offsetHeight);
    } else {
      setActionBarHeight(0);
    }
  }, []);

  const updateScrollbarWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollable =
      el.querySelector('[class*="overflow"]') ||
      el.querySelector('[style*="overflow"]') ||
      el.firstElementChild;

    if (scrollable && scrollable instanceof HTMLElement) {
      const width = scrollable.clientWidth
        ? scrollable.offsetWidth - scrollable.clientWidth
        : 0;
      setScrollbarWidth(width);
    }
  }, []);

  // Determine the actual ActionBar content to render
  let renderedActionBar: ReactNode = null;

  if (actionBar) {
    const rendered = actionBar(trigger.selectedKeys);
    renderedActionBar = (
      <ActionBarContext
        value={{
          selectedItemCount: trigger.selectedItemCount,
          onClearSelection: trigger.clearSelection,
        }}
      >
        {rendered}
      </ActionBarContext>
    );
  }

  // Only observe when there's an ActionBar
  useResizeObserver({
    ref: actionBar ? containerRef : undefined,
    onResize: updateScrollbarWidth,
  });

  const renderContainerWithActionBar = useCallback(
    (children: ReactNode) => {
      const style: CSSProperties & Record<string, string> = {
        '--action-bar-height': actionBarHeight ? `${actionBarHeight}px` : '0px',
      };

      return (
        <div
          ref={containerRef}
          className="relative overflow-clip"
          style={style}
        >
          {children}

          {renderedActionBar && (
            <div
              ref={actionBarRef}
              className="absolute inset-x-0 bottom-0 flex justify-center"
              style={{ insetInlineEnd: scrollbarWidth || undefined }}
            >
              {renderedActionBar}
            </div>
          )}
        </div>
      );
    },
    [actionBarHeight, renderedActionBar, actionBarRef, scrollbarWidth]
  );

  return {
    selectedKeys: trigger.selectedKeys,
    onSelectionChange: trigger.onSelectionChange,
    actionBarHeight,
    renderContainerWithActionBar,
  };
};
