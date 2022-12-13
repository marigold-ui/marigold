import React, { ReactNode, useRef } from 'react';
import { useMenuTriggerState } from '@react-stately/menu';
import { PressResponder } from '@react-aria/interactions';
import { useMenuTrigger } from '@react-aria/menu';
import { useObjectRef } from '@react-aria/utils';
import { useResponsiveValue } from '@marigold/system';
import { MenuContext, MenuContextProps } from './Context';
import { Popover, Tray } from '../Overlay';

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

  const isSmallScreen = useResponsiveValue([true, false, false], 2);

  return (
    <MenuContext.Provider value={menuContext}>
      <PressResponder
        {...menuTriggerProps}
        ref={menuTriggerRef}
        isPressed={state.isOpen}
      >
        {menuTrigger}
      </PressResponder>
      {isSmallScreen ? (
        <Tray state={state}>{menu}</Tray>
      ) : (
        <Popover triggerRef={menuTriggerRef} scrollRef={menuRef} state={state}>
          {menu}
        </Popover>
      )}
    </MenuContext.Provider>
  );
};
