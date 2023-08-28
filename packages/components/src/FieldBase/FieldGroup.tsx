import { ReactNode, createContext, useContext } from 'react';

export interface FieldGroupContextProps {
  labelWidth?: string;
}

export const FieldGroupContext = createContext<FieldGroupContextProps>({});
export const useFieldGroupContext = () => useContext(FieldGroupContext);

export interface FieldGroupProps {
  labelWidth?: string;
  children: ReactNode;
}
export const FieldGroup = ({ labelWidth, children }: FieldGroupProps) => {
  return (
    <FieldGroupContext.Provider value={{ labelWidth }}>
      {children}
    </FieldGroupContext.Provider>
  );
};
