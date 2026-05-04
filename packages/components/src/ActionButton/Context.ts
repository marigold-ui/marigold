import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import type { ActionButtonProps } from './ActionButton';
import type { ActionButtonGroupProps } from './ActionButtonGroup';

export const ActionButtonContext =
  createContext<ContextValue<ActionButtonProps, HTMLButtonElement>>(null);

export const ActionButtonGroupContext =
  createContext<ContextValue<ActionButtonGroupProps, HTMLDivElement>>(null);
