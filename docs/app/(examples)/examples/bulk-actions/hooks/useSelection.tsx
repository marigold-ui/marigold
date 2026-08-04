'use client';

import {
  type PropsWithChildren,
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
} from 'react';
import type { Selection } from '@marigold/components';

// The one selection the whole page shares.
//
// While the action bar is visible, the selection is the object the user works
// on: the table writes it, the bar reads it, and every scope-changing setter
// (search, status filter, page — see usePagination) clears it so it can never
// outlive the view it was made in. Keeping it in context means the clearing
// rule lives in the hooks, not in call sites that could forget it.

interface EventsSelection {
  selected: Selection;
  setSelected: (next: Selection) => void;
  clearSelection: () => void;
}

const SelectionContext = createContext<EventsSelection | null>(null);

export const SelectionProvider = ({ children }: PropsWithChildren) => {
  const [selected, setSelected] = useState<Selection>(() => new Set());

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const value = useMemo(
    () => ({ selected, setSelected, clearSelection }),
    [selected, clearSelection]
  );

  return <SelectionContext value={value}>{children}</SelectionContext>;
};

export const useSelection = () => {
  const context = use(SelectionContext);
  if (context === null) {
    throw new Error('useSelection must be used within a <SelectionProvider>');
  }
  return context;
};
