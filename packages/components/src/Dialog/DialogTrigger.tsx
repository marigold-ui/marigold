import React, { ReactNode, useRef } from 'react';
import { PressResponder } from '@react-aria/interactions';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Modal } from '../Overlay/Modal';

export interface DialogTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}

export const DialogTrigger = ({
  children,
  dismissable = true,
  keyboardDismissable = true,
}: DialogTriggerProps) => {
  const [dialogTrigger, dialog] = React.Children.toArray(children);

  const dialogTriggerRef = useRef(null);
  const state = useOverlayTriggerState({});

  return (
    <>
      <PressResponder
        ref={dialogTriggerRef}
        isPressed={state.isOpen}
        onPress={state.toggle}
      >
        {dialogTrigger}
      </PressResponder>
      <Modal
        open={state.isOpen}
        onClose={state.close}
        dismissable={dismissable}
        keyboardDismissable={keyboardDismissable}
      >
        {dialog}
      </Modal>
    </>
  );
};
