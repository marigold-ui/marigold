import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Selection } from '../types';
import { ActionBarContext } from './ActionBarContext';

export interface UseActionBarProps {
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

export interface UseActionBarReturn {
  /** Pass to Table's `selectedKeys` prop. */
  selectedKeys: Selection;

  /** Pass to Table's `onSelectionChange` prop. */
  onSelectionChange: (keys: Selection) => void;

  /** Measured height of the ActionBar in pixels. */
  actionBarHeight: number;

  /** The ActionBar overlay element to render as a sibling, or `null` when no actionBar. */
  actionBarOverlay: ReactNode;
}

export const useActionBar = ({
  selectedKeys: controlledKeys,
  defaultSelectedKeys,
  onSelectionChange,
  actionBar,
}: UseActionBarProps): UseActionBarReturn => {
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

  const onHeightChange = useCallback(
    (height: number) => setActionBarHeight(height),
    []
  );

  let actionBarOverlay: ReactNode = null;

  if (actionBar) {
    const rendered = actionBar(selectedKeys);
    actionBarOverlay = (
      <ActionBarContext
        value={{
          selectedItemCount,
          onClearSelection: clearSelection,
          onHeightChange,
        }}
      >
        {rendered}
      </ActionBarContext>
    );
  }

  return {
    selectedKeys,
    onSelectionChange: handleSelectionChange,
    actionBarHeight,
    actionBarOverlay,
  };
};
