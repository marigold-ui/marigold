import { createContext, useContext } from 'react';
import { CheckboxGroupState } from '@react-stately/checkbox';

export interface CheckboxGroupContextProps extends CheckboxGroupState {
  error?: boolean;
  variant?: string;
  size?: string;
  width?: string;
}

/**
 * Needs to be falsy so we can check if a checkbox is used as standalone
 * or in a group.
 */
export const CheckboxGroupContext = createContext<CheckboxGroupContextProps>(
  null as any
);
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
