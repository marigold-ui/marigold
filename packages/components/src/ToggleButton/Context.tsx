import { createContext } from 'react';

export interface ToggleButtonContextValue {
  variant?: string;
  size?: string;
}

export const ToggleButtonContext = createContext<ToggleButtonContextValue>({});
