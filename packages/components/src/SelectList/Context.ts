import { createContext, useContext } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface SelectListContextProps {
  classNames: ComponentClassNames<'ListBox'>;
}

export const SelectListContext = createContext<SelectListContextProps>(
  {} as SelectListContextProps
);
export const useSelectListContext = () => useContext(SelectListContext);
