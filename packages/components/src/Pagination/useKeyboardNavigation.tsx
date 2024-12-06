import { useCallback, useRef, useState } from 'react';
import { useKeyboard } from '@react-aria/interactions';

export const NavigationTypes = {
  Prev: 'prev',
  Next: 'next',
  Page: 'page',
  Ellipsis: 'ellipsis',
} as const;

export type NavigationKeys =
  (typeof NavigationTypes)[keyof typeof NavigationTypes];

interface NavigationItem {
  type: NavigationKeys;
  value: number | 'ellipsis';
}

interface UseKeyboardNavigationProps {
  page: number;
  totalPages: number;
  onChange?: (page: number) => void;
}

export const useKeyboardNavigation = ({
  page,
  totalPages,
  onChange = () => {},
}: UseKeyboardNavigationProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [focusedItem, setFocusedItem] = useState<NavigationItem>({
    type: 'page',
    value: page,
  });
  const navigationItems = useRef<NavigationItem[]>([]);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const isItemDisabled = useCallback(
    (item: NavigationItem): boolean => {
      if (item.type === NavigationTypes.Prev) return page <= 1;
      if (item.type === NavigationTypes.Next) return page >= totalPages;
      return item.type === NavigationTypes.Ellipsis;
    },
    [page, totalPages]
  );

  const findNextFocusableItem = useCallback(
    (current: NavigationItem, direction: 'next' | 'prev'): NavigationItem => {
      const items = navigationItems.current.filter(
        item => !isItemDisabled(item)
      );
      const currentIndex = items.findIndex(
        item => item.type === current.type && item.value === current.value
      );

      if (currentIndex === -1) {
        // If current item is not found or disabled, find the first enabled item
        return items[0] || { type: NavigationTypes.Page, value: page };
      }

      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;

      return items[nextIndex];
    },
    [isItemDisabled, page]
  );

  const focusItem = useCallback(
    (item: NavigationItem) => {
      if (isItemDisabled(item)) return;

      const key = `${item.type}-${item.value}`;
      const element = buttonRefs.current.get(key);
      if (element && typeof element.focus === 'function') {
        element.focus();
        setFocusedItem(item);
      }
    },
    [isItemDisabled]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      let newFocusedItem = focusedItem;

      switch (e.key) {
        case 'ArrowLeft':
          newFocusedItem = findNextFocusableItem(focusedItem, 'prev');
          break;
        case 'ArrowRight':
          newFocusedItem = findNextFocusableItem(focusedItem, 'next');
          break;
        case 'Home':
          newFocusedItem =
            navigationItems.current.find(item => !isItemDisabled(item)) ||
            focusedItem;
          break;
        case 'End':
          newFocusedItem =
            [...navigationItems.current]
              .reverse()
              .find(item => !isItemDisabled(item)) || focusedItem;
          break;
        case 'Enter':
        case ' ':
          if (isItemDisabled(focusedItem)) return;
          if (
            focusedItem.type === NavigationTypes.Page &&
            typeof focusedItem.value === 'number'
          ) {
            onChange(focusedItem.value);
          } else if (focusedItem.type === NavigationTypes.Prev && page > 1) {
            onChange(page - 1);
          } else if (
            focusedItem.type === NavigationTypes.Next &&
            page < totalPages
          ) {
            onChange(page + 1);
          }
          break;
        default:
          return;
      }

      if (newFocusedItem !== focusedItem) {
        focusItem(newFocusedItem);
      }
    },
  });

  const registerRef = useCallback(
    (
      type: NavigationKeys,
      value: number | 'ellipsis',
      ref: HTMLButtonElement | null
    ) => {
      const key = `${type}-${value}`;
      if (ref) {
        buttonRefs.current.set(key, ref);
      } else {
        buttonRefs.current.delete(key);
      }
    },
    []
  );

  const setNavigationItems = useCallback((items: NavigationItem[]) => {
    navigationItems.current = items;
  }, []);

  return {
    containerRef,
    keyboardProps,
    registerRef,
    setNavigationItems,
    setFocusedItem,
  };
};
