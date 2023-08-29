import { createContext, useContext } from 'react';

import { RadioGroupState } from '@react-stately/radio';

import { WidthProp } from '@marigold/system';

export interface RadioGroupContextProps {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  error?: boolean;
  state: RadioGroupState;
}

export const RadioGroupContext = createContext<RadioGroupContextProps>(
  null as any
);
export const useRadioGroupContext = () => useContext(RadioGroupContext);
