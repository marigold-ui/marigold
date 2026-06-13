import { createContext, use } from 'react';

export interface DrawerContextProps {
  variant?: string;
  size?: string;
}

export const DrawerContext = createContext<DrawerContextProps>({
  variant: undefined,
  size: undefined,
});

export const useDrawerContext = () => use(DrawerContext);

/**
 * `true` when an open Drawer wraps the consumer. `useDrawerCoordination`
 * reads it to distinguish nested drawers (which must not preempt the parent)
 * from sibling drawers (which do).
 */
export const DrawerNestingContext = createContext(false);
