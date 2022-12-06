import React, { ReactNode, useRef } from 'react';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { MenuContext, MenuContextProps } from './Context';
import { PressResponder } from '@react-aria/interactions';
import { Popover } from '../_Overlay/Popover';
import { usePopover } from '@react-aria/overlays';

export interface MenuTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
  disabled?: boolean;
}

export const MenuTrigger = ({ disabled, children }: MenuTriggerProps) => {
  const [menuTrigger, menu] = React.Children.toArray(children);

  const menuTriggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef(null);

  const state = useMenuTriggerState({});

  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { trigger: 'press', isDisabled: disabled },
    state,
    menuTriggerRef
  );

  // brauche ich hier noch usePopover?
  // const { popoverProps } = usePopover(
  //   {
  //     triggerRef: menuTriggerRef,
  //     popoverRef: overlayRef,
  //     placement: 'bottom left',
  //   },
  //   state
  // );
  const menuContext: MenuContextProps = {
    ...menuProps,
    open: state.isOpen,
    onClose: state.close,
    autoFocus: state.focusStrategy,
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
      <Popover
        open={state.isOpen}
        dismissable={true}
        shouldCloseOnBlur={true}
        triggerRef={menuTriggerRef}
        state={state}
        minWidth={
          menuTriggerRef.current
            ? menuTriggerRef.current.offsetWidth
            : undefined
        }
      >
        {menu}
      </Popover>
    </MenuContext.Provider>
  );
};
