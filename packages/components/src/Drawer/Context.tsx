import type { RefCallback } from 'react';
import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface DrawerContextProps {
  variant?: string;
  size?: string;
  classNames: ComponentClassNames<'Drawer'>;
  titleId?: string;
  hasTitle?: boolean;
  titleSlotRef?: RefCallback<Element>;
}

export const DrawerContext = createContext<DrawerContextProps>({
  variant: undefined,
  size: undefined,
  classNames: {} as ComponentClassNames<'Drawer'>,
});

export const useDrawerContext = () => use(DrawerContext);

/**
 * `true` when an open Drawer wraps the consumer. `useDrawerCoordination`
 * reads it to distinguish nested drawers (which must not preempt the parent)
 * from sibling drawers (which do).
 */
export const DrawerNestingContext = createContext(false);
