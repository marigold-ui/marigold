import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { useResizeObserver } from '@react-aria/utils';
import type { Selection } from '../types';
import { ActionBarContext } from './ActionBarContext';

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

  /** The ActionBar overlay element to render as a sibling, or `null` when no actionBar. */
  actionBarOverlay: ReactNode;
}

export const useActionBarContainer = ({
  selectedKeys: controlledKeys,
  defaultSelectedKeys,
  onSelectionChange,
  actionBar,
}: UseActionBarContainerProps): UseActionBarContainerReturn => {
  // Selection state (controlled/uncontrolled)
  const isControlled = controlledKeys !== undefined;
  const [internalKeys, setInternalKeys] = useState<Selection>(
    defaultSelectedKeys ?? new Set()
  );

  const selectedKeys = isControlled ? controlledKeys : internalKeys;

  const onSelectionChangeRef = useRef(onSelectionChange);
  useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
  });

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      if (!isControlled) {
        setInternalKeys(keys);
      }
      onSelectionChangeRef.current?.(keys);
    },
    [isControlled]
  );

  const clearSelection = useCallback(() => {
    handleSelectionChange(new Set());
  }, [handleSelectionChange]);

  const selectedItemCount: number | 'all' =
    selectedKeys === 'all'
      ? 'all'
      : selectedKeys instanceof Set
        ? selectedKeys.size
        : 0;

  // ActionBar height measurement
  const [actionBarHeight, setActionBarHeight] = useState(0);

  const actionBarRef: RefObject<HTMLDivElement | null> = useRef(null);

  useResizeObserver({
    ref: actionBarRef,
    onResize: () => {
      setActionBarHeight(actionBarRef.current?.offsetHeight ?? 0);
    },
  });

  let actionBarOverlay: ReactNode = null;

  if (actionBar) {
    const rendered = actionBar(selectedKeys);
    actionBarOverlay = (
      <div
        ref={actionBarRef}
        className="sticky flex justify-center"
        style={{ bottom: 'var(--actionbar-offset, 8px)' }}
      >
        <ActionBarContext
          value={{
            selectedItemCount,
            onClearSelection: clearSelection,
          }}
        >
          {rendered}
        </ActionBarContext>
      </div>
    );
  }

  return {
    selectedKeys,
    onSelectionChange: handleSelectionChange,
    actionBarHeight,
    actionBarOverlay,
  };
};
