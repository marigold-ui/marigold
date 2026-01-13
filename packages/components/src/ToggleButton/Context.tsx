import { createContext } from 'react';

export interface ToggleButtonContext {
  variant?: string;
  size?: string;
}

export const ToggleButtonContext = createContext<ToggleButtonContext>({});
