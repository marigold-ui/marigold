import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import type { ActionGroupProps } from './ActionGroup';

export const ActionGroupContext =
  createContext<ContextValue<ActionGroupProps, HTMLDivElement>>(null);
