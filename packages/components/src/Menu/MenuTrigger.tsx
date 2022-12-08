import React, { ReactNode, useRef } from 'react';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { MenuContext, MenuContextProps } from './Context';
import { PressResponder } from '@react-aria/interactions';
import { Popover } from '../Overlay/Popover';
import { useObjectRef } from '@react-aria/utils';

export interface MenuTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
  disabled?: boolean;
}

export const MenuTrigger = ({ disabled, children }: MenuTriggerProps) => {
  const [menuTrigger, menu] = React.Children.toArray(children);

  const menuTriggerRef = useRef<HTMLElement>(null);
  const menuRef = useObjectRef<HTMLUListElement>();

  const state = useMenuTriggerState({});

  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { trigger: 'press', isDisabled: disabled },
    state,
    menuTriggerRef
  );

  const menuContext: MenuContextProps = {
    ...menuProps,
    ref: menuRef,
    open: state.isOpen,
    onClose: state.close,
    autoFocus: state.focusStrategy,
  };

  return (
    <MenuContext.Provider value={menuContext}>
      <PressResponder
        {...menuTriggerProps}
        ref={menuTriggerRef}
        isPressed={state.isOpen}
      >
        {menuTrigger}
      </PressResponder>
      <Popover triggerRef={menuTriggerRef} scrollRef={menuRef} state={state}>
        {menu}
      </Popover>
    </MenuContext.Provider>
  );
};
