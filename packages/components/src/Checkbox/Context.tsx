import { createContext, use } from 'react';
import { WidthProp } from '@marigold/system';

export interface CheckboxGroupContextProps {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
}

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextProps | null>(null);
export const useCheckboxGroupContext = () => use(CheckboxGroupContext);
