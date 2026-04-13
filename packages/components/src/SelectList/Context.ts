import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface SelectListContextProps {
  classNames: ComponentClassNames<'ListBox'>;
}

export const SelectListContext = createContext<SelectListContextProps>({
  classNames: {} as ComponentClassNames<'ListBox'>,
});
export const useSelectListContext = () => use(SelectListContext);
