import { createContext, useContext } from 'react';
import { RadioGroupState } from '@react-stately/radio';

export interface RadioGroupContextProps extends RadioGroupState {
  variant?: string;
  size?: string;
  width?: string;
  error?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextProps>(
  null as any
);
export const useRadioGroupContext = () => useContext(RadioGroupContext);
