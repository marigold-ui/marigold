import {
  createContext,
  HTMLAttributes,
  MutableRefObject,
  useContext,
} from 'react';
import { FocusStrategy } from '@react-types/shared';

export interface MenuContextProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'autoFocus'> {
  ref?: MutableRefObject<HTMLUListElement | undefined>;
  autoFocus?: boolean | FocusStrategy;
  open?: boolean;
  onClose?: () => void;
  className?: any;
}

export const MenuContext = createContext<MenuContextProps>({});
export const useMenuContext = () => useContext(MenuContext);
