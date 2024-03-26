import { createContext, useContext } from 'react';

export interface SelectListContextProps {
  classNames: any;
}

export const SelectListContext = createContext<SelectListContextProps>(
  {} as any
);
export const useSelectListContext = () => useContext(SelectListContext);
