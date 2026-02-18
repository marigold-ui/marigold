import type { ReactNode, RefObject } from 'react';
import { useRef, useState } from 'react';
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

  /** The ActionBar overlay element to render as a sibling, or `null` when no actionBar. */
  actionBarOverlay: ReactNode;
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

  const actionBarRef: RefObject<HTMLDivElement | null> = useRef(null);

  useResizeObserver({
    ref: actionBarRef,
    onResize: () => {
      setActionBarHeight(actionBarRef.current?.offsetHeight ?? 0);
    },
  });

  let actionBarOverlay: ReactNode = null;

  if (actionBar) {
    const rendered = actionBar(trigger.selectedKeys);
    actionBarOverlay = (
      <div
        ref={actionBarRef}
        className="sticky flex justify-center"
        style={{ bottom: 'var(--actionbar-offset, 8px)' }}
      >
        <ActionBarContext
          value={{
            selectedItemCount: trigger.selectedItemCount,
            onClearSelection: trigger.clearSelection,
          }}
        >
          {rendered}
        </ActionBarContext>
      </div>
    );
  }

  return {
    selectedKeys: trigger.selectedKeys,
    onSelectionChange: trigger.onSelectionChange,
    actionBarHeight,
    actionBarOverlay,
  };
};
