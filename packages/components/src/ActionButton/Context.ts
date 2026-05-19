import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components/slots';
import type { ActionButtonProps } from './ActionButton';

// Widen with `className?` so a parent container can inject a positional class without a cast.
export type ActionButtonContextValue = ActionButtonProps & {
  className?: string;
};

export const ActionButtonContext =
  createContext<ContextValue<ActionButtonContextValue, HTMLButtonElement>>(
    null
  );
