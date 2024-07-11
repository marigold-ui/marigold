import { ReactNode, createContext, useContext } from 'react';

export interface FieldGroupContextProps {
  labelWidth?: string;
}

export const FieldGroupContext = createContext<FieldGroupContextProps>({});
export const useFieldGroupContext = () => useContext(FieldGroupContext);

export interface FieldGroupProps {
  /**
   * Sets the width of all Fields labels used inside the `FieldGroup`
   */
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
