import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components/slots';
import type { ActionMenuProps } from './ActionMenu';

// Widen with `className?` so context consumers can opt in to RAC's
// className-merge plumbing without a cast at the consumption site.
// ActionMenu itself discards the merged className — see the destructure
// in ActionMenu.tsx for why.
export type ActionMenuContextValue = ActionMenuProps & { className?: string };

export const ActionMenuContext =
  createContext<ContextValue<ActionMenuContextValue, HTMLButtonElement>>(null);
