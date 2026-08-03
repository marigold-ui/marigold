import { createContext, use } from 'react';

export interface RadioGroupContextProps {
  variant?: string;
  size?: string;
}

export const RadioGroupContext = createContext<RadioGroupContextProps>({});
export const useRadioGroupContext = () => use(RadioGroupContext);
