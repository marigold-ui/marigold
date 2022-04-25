import { createContext, HTMLAttributes, useContext } from 'react';
import { FocusStrategy } from '@react-types/shared';

export interface MenuContextProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  autoFocus?: boolean | FocusStrategy;
  open?: boolean;
  onClose?: () => void;
  triggerWidth?: number;
}

export const MenuContext = createContext<MenuContextProps>({});
export const useMenuContext = () => useContext(MenuContext);
