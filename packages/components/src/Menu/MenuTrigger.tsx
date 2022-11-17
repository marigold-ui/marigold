import React, { ReactNode, useRef } from 'react';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';

import { Popover } from '../Overlay';
import { MenuContext, MenuContextProps } from './Context';
import { PressResponder } from '@react-aria/interactions';

export interface MenuTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
  disabled?: boolean;
}

export const MenuTrigger = ({ disabled, children }: MenuTriggerProps) => {
  const [menuTrigger, menu] = React.Children.toArray(children);

  const menuTriggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef(null);

  const state = useMenuTriggerState({});
  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { trigger: 'press', isDisabled: disabled },
    state,
    menuTriggerRef
  );

  // TODO: Should we passdown menuRef here? For what? Use as ref in the menu?
  //        useSynRef is used in the menu to sync this ref and its own ref
  const menuContext: MenuContextProps = {
    ...menuProps,
    open: state.isOpen,
    onClose: state.close,
    autoFocus: state.focusStrategy,
    triggerWidth: menuTriggerRef.current
      ? menuTriggerRef.current.offsetWidth
      : undefined,
  };

  // TODO: What about dismissable={true} and shouldCloseOnBlur={true}
  //       was on the popover before.
  // TODO: Rename scrollRef to "overlayRef"

  return (
    <MenuContext.Provider value={menuContext}>
      <PressResponder
        {...menuTriggerProps}
        ref={menuTriggerRef}
        isPressed={state.isOpen}
      >
        {menuTrigger}
      </PressResponder>
      <Popover state={state} triggerRef={menuTriggerRef} scrollRef={menuRef}>
        {menu}
      </Popover>
    </MenuContext.Provider>
  );
};
