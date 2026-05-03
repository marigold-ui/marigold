import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import type { ActionMenuProps } from './ActionMenu';

export const ActionMenuContext =
  createContext<ContextValue<ActionMenuProps, HTMLButtonElement>>(null);
