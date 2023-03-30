import React from 'react';
import { createContext, ReactNode, useContext } from 'react';

export interface FieldGroupContextProps {
  labelWidth?: string;
  labelPosition?: 'top' | 'left';
}

export const FieldGroupContext = createContext<FieldGroupContextProps>({});
export const useFieldGroupContext = () => useContext(FieldGroupContext);

export interface FieldGroupProps {
  labelWidth?: string;
  labelPosition?: 'top' | 'left';
  children: ReactNode;
}
export const FieldGroup = ({
  labelWidth,
  labelPosition = 'top',
  children,
}: FieldGroupProps) => {
  return (
    <FieldGroupContext.Provider value={{ labelWidth, labelPosition }}>
      {children}
    </FieldGroupContext.Provider>
  );
};
