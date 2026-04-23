import { createContext, useContext } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface SelectListContextProps {
  classNames: ComponentClassNames<'SelectList'>;
}

export const SelectListContext = createContext<SelectListContextProps>({
  classNames: {} as ComponentClassNames<'SelectList'>,
});
export const useSelectListContext = () => useContext(SelectListContext);
