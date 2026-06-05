import type { RefCallback } from 'react';
import { createContext, use } from 'react';
import type { ThemeComponent } from '@marigold/system';

export interface DrawerContextProps {
  variant?: string;
  size?: string;
  /**
   * Resolved theme classes and title-slot wiring shared with the Drawer
   * sub-components. Optional because `DrawerContext` has a default value used
   * before a `<Drawer>` publishes one.
   */
  classNames?: {
    [Key in keyof ThemeComponent<'Drawer'>]: string;
  };
  titleId?: string;
  hasTitle?: boolean;
  titleSlotRef?: RefCallback<Element>;
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
