import { createContext, useContext } from 'react';

export interface ToggleButtonContextProps {
  classNames: string;
}

export const ToggleButtonContext = createContext<ToggleButtonContextProps>(
  {} as any
);
export const useToggleButtonContext = () => useContext(ToggleButtonContext);
