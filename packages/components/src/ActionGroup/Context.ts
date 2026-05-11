import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import type { ActionGroupProps } from './ActionGroup';

// Widen with `className?` so a parent container can inject a positional class without a cast.
type ActionGroupContextValue = ActionGroupProps & { className?: string };

export const ActionGroupContext =
  createContext<ContextValue<ActionGroupContextValue, HTMLDivElement>>(null);
