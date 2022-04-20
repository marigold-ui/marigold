import React, { ReactNode, useRef } from 'react';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';

import { MenuContext, MenuContextProps } from './Menu';

export interface MenuTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
}

export const MenuTrigger = ({ children }: MenuTriggerProps) => {
  const [trigger, menu] = React.Children.toArray(children);

  const state = useMenuTriggerState({});
  const ref = useRef<HTMLElement>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  const menuContext: MenuContextProps = {
    ...menuProps,
    open: state.isOpen,
    onClose: state.close,
  };

  return (
    <MenuContext.Provider value={menuContext}>
      {React.cloneElement(trigger as React.ReactElement<any>, menuTriggerProps)}
      {state.isOpen && menu}
    </MenuContext.Provider>
  );
};
