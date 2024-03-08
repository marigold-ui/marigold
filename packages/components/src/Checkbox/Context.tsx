import { createContext, useContext } from 'react';

import { WidthProp } from '@marigold/system';

export interface CheckboxGroupContextProps {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextProps>(
  null as any
);
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
