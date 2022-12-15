import { createContext, ReactNode, useContext } from 'react';

const LABEL_SPACE = {
  small: '0.2',
  medium: '0.5',
  large: '1',
  none: 'auto',
};

export interface FieldBaseGroupContextProps {
  space?: keyof typeof LABEL_SPACE;
}

export const FieldBaseGroupContext = createContext<FieldBaseGroupContextProps>(
  {}
);
export const useFieldBaseGroupContext = () => useContext(FieldBaseGroupContext);

export interface FieldBaseGroupProps {
  space?: keyof typeof LABEL_SPACE;
  children: ReactNode;
}
export const FieldBaseGroup = ({ space, children }: FieldBaseGroupProps) => {
  return (
    <FieldBaseGroupContext.Provider value={{ space }}>
      {children}
    </FieldBaseGroupContext.Provider>
  );
};
