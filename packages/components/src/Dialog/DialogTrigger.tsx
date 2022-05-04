import React, { ReactNode, useRef } from 'react';
import { PressResponder } from '@react-aria/interactions';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useOverlayTrigger } from '@react-aria/overlays';
import { Modal } from '../Overlay/Modal';

export interface DialogTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
  dismissable?: boolean;
  keyboardDismissDisabled?: boolean;
}

export const DialogTrigger = ({
  children,
  dismissable = true,
  keyboardDismissDisabled = true,
}: DialogTriggerProps) => {
  const [dialogTrigger, dialog] = React.Children.toArray(children);

  const dialogTriggerRef = useRef(null);

  const state = useOverlayTriggerState({});
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    dialogTriggerRef
  );

  return (
    <>
      <PressResponder
        {...triggerProps}
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
        keyboardDismissDisabled={keyboardDismissDisabled}
        {...overlayProps}
      >
        {dialog}
      </Modal>
    </>
  );
};
