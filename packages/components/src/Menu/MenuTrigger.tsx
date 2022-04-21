import React, { ReactNode, useRef } from 'react';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';

import { Popover } from '../Overlay';
import { MenuContext, MenuContextProps } from './Context';
import { useOverlayPosition } from '@react-aria/overlays';
import { PressResponder } from '@react-aria/interactions';

export interface MenuTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
  disabled?: boolean;
}

export const MenuTrigger = ({ disabled, children }: MenuTriggerProps) => {
  const [menuTrigger, menu] = React.Children.toArray(children);

  const menuTriggerRef = useRef(null);
  const overlayRef = useRef(null);

  const state = useMenuTriggerState({});
  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { trigger: 'press', isDisabled: disabled },
    state,
    menuTriggerRef
  );

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: menuTriggerRef,
    overlayRef,
    isOpen: state.isOpen,
  });

  const menuContext: MenuContextProps = {
    ...menuProps,
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
      <Popover
        open={state.isOpen}
        onClose={state.close}
        dismissable={true}
        shouldCloseOnBlur={true}
        ref={overlayRef}
        {...positionProps}
      >
        {menu}
      </Popover>
    </MenuContext.Provider>
  );
};
