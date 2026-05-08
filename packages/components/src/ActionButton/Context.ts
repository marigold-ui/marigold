import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import type { ActionButtonProps } from './ActionButton';

export const ActionButtonContext =
  createContext<ContextValue<ActionButtonProps, HTMLButtonElement>>(null);
