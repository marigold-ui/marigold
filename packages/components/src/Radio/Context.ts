import { createContext, useContext } from 'react';

import { WidthProp } from '@marigold/system';

export interface RadioGroupContextProps {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
}

export const RadioGroupContext = createContext<RadioGroupContextProps>(
  null as any
);
export const useRadioGroupContext = () => useContext(RadioGroupContext);
