import { createContext, ReactNode, useContext } from 'react';

export interface FieldBaseGroupContextProps {
  space?: 'small' | 'none' | 'large' | 'medium' | undefined;
}

export const FieldBaseGroupContext = createContext<FieldBaseGroupContextProps>(
  {}
);
export const useFieldBaseGroupContext = () => useContext(FieldBaseGroupContext);

export interface FieldBaseGroupProps {
  space?: 'small' | 'none' | 'large' | 'medium' | undefined;
  children: ReactNode;
}
export const FieldBaseGroup = ({ space, children }: FieldBaseGroupProps) => {
  return (
    <FieldBaseGroupContext.Provider value={{ space }}>
      {children}
    </FieldBaseGroupContext.Provider>
  );
};
