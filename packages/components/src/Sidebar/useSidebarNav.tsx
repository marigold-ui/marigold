import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import { createFocusManager } from '@react-aria/focus';
import type { SidebarNode } from './collection';

// Derive position from stack — determines CSS transition state
export const panelPosition = (
  panelKey: string,
  stack: string[]
): 'active' | 'before' | 'after' => {
  const activeKey = stack.at(-1) ?? null;
  if (panelKey === 'root') return activeKey ? 'before' : 'active';
  if (panelKey === activeKey) return 'active';
  const idx = stack.indexOf(panelKey);
  return idx >= 0 && idx < stack.length - 1 ? 'before' : 'after';
};

export interface PanelKeyboardProps {
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const usePanelKeyboard = (
  panelRef: RefObject<HTMLDivElement | null>
): PanelKeyboardProps => {
  const focusManager = useMemo(() => createFocusManager(panelRef), [panelRef]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          focusManager.focusNext({ wrap: true });
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusManager.focusPrevious({ wrap: true });
          break;
        case 'Home':
          e.preventDefault();
          focusManager.focusFirst();
          break;
        case 'End':
          e.preventDefault();
          focusManager.focusLast();
          break;
      }
    },
    [focusManager]
  );

  return { onKeyDown: handleKeyDown };
};

interface RovingTabIndexContextValue {
  focusedKey: string;
  setFocusedKey: (key: string) => void;
}

const RovingTabIndexContext = createContext<RovingTabIndexContextValue | null>(
  null
);

export interface RovingTabIndexProviderProps {
  nodes: SidebarNode[];
  children: ReactNode;
}

export const RovingTabIndexProvider = ({
  nodes,
  children,
}: RovingTabIndexProviderProps) => {
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  const defaultKey = useMemo(() => {
    const active = nodes.find(n => n.type === 'item' && n.active);
    if (active) return active.key;
    return nodes.find(n => n.type === 'item')?.key ?? '__back__';
  }, [nodes]);

  const value = useMemo(
    () => ({
      focusedKey: currentKey ?? defaultKey,
      setFocusedKey: setCurrentKey,
    }),
    [currentKey, defaultKey]
  );

  return (
    <RovingTabIndexContext value={value}>{children}</RovingTabIndexContext>
  );
};

/**
 * Tracks a value across renders and returns the last *different* value.
 * On the first render or if the value has never changed, returns `undefined`.
 */
export const useLastDistinctValue = <T,>(value: T): T | undefined => {
  const [prev, setPrev] = useState<{ current: T; previous: T | undefined }>({
    current: value,
    previous: undefined,
  });

  if (prev.current !== value) {
    setPrev({ current: value, previous: prev.current });
  }

  return prev.previous;
};

export const useRovingItem = (key: string) => {
  const ctx = useContext(RovingTabIndexContext);
  if (!ctx) {
    throw new Error(
      'useRovingItem must be used within a RovingTabIndexProvider'
    );
  }

  const { focusedKey, setFocusedKey } = ctx;

  return {
    tabIndex: (key === focusedKey ? 0 : -1) as 0 | -1,
    onFocus: () => setFocusedKey(key),
  };
};
