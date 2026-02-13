import { useCallback, useEffect, useRef, useState } from 'react';
import type { Selection } from '../types';

export interface UseActionBarTriggerProps {
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
}

export interface UseActionBarTriggerReturn {
  /** Pass to Table's `selectedKeys` prop. */
  selectedKeys: Selection;

  /** Pass to Table's `onSelectionChange` prop. */
  onSelectionChange: (keys: Selection) => void;

  /** Pass to ActionBar's `selectedItemCount` prop. */
  selectedItemCount: number | 'all';

  /** Pass to ActionBar's `onClearSelection` prop. */
  clearSelection: () => void;

  /** Whether ActionBar should be visible (at least one item selected). */
  isOpen: boolean;
}

/**
 * Convenience hook that manages selection state wiring between
 * a selectable collection (Table, ListBox, etc.) and ActionBar.
 *
 * Supports both controlled and uncontrolled usage.
 */
export const useActionBarTrigger = ({
  selectedKeys: controlledKeys,
  defaultSelectedKeys,
  onSelectionChange,
}: UseActionBarTriggerProps = {}): UseActionBarTriggerReturn => {
  const isControlled = controlledKeys !== undefined;
  const [internalKeys, setInternalKeys] = useState<Selection>(
    defaultSelectedKeys ?? new Set()
  );

  const selectedKeys = isControlled ? controlledKeys : internalKeys;

  // Keep a ref to avoid stale closure in callbacks
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

  const isOpen = selectedItemCount === 'all' || selectedItemCount > 0;

  return {
    selectedKeys,
    onSelectionChange: handleSelectionChange,
    selectedItemCount,
    clearSelection,
    isOpen,
  };
};
