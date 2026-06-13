import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface SelectListContextProps {
  classNames: ComponentClassNames<'SelectList'>;
  disabled?: boolean;
}

export const SelectListContext = createContext<SelectListContextProps>({
  classNames: {} as ComponentClassNames<'SelectList'>,
});
export const useSelectListContext = () => use(SelectListContext);
