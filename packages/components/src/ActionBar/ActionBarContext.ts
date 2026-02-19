import { createContext, useContext } from 'react';

export interface ActionBarContextValue {
  selectedItemCount: number | 'all';
  onClearSelection: () => void;
  onHeightChange?: (height: number) => void;
}

export const ActionBarContext = createContext<ActionBarContextValue | null>(
  null
);

export const useActionBarContext = () => useContext(ActionBarContext);
