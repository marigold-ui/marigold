import React from 'react';
import { createContext, ReactNode, useContext } from 'react';

export interface FieldBaseGroupContextProps {
  labelWidth?: string;
}

export const FieldBaseGroupContext = createContext<FieldBaseGroupContextProps>(
  {}
);
export const useFieldBaseGroupContext = () => useContext(FieldBaseGroupContext);

export interface FieldBaseGroupProps {
  labelWidth?: string;
  children: ReactNode;
}
export const FieldBaseGroup = ({
  labelWidth,
  children,
}: FieldBaseGroupProps) => {
  return (
    <FieldBaseGroupContext.Provider value={{ labelWidth }}>
      {children}
    </FieldBaseGroupContext.Provider>
  );
};
