import React, { ReactNode, useRef } from 'react';

import { PressResponder } from '@react-aria/interactions';

import { useOverlayTriggerState } from '@react-stately/overlays';

import { Modal, Overlay } from '../Overlay';
import { DialogContext } from './Context';

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

  const ctx = { open: state.isOpen, close: state.close };

  return (
    <DialogContext.Provider value={ctx}>
      <PressResponder
        ref={dialogTriggerRef}
        isPressed={state.isOpen}
        onPress={state.toggle}
      >
        {dialogTrigger}
      </PressResponder>
      <Overlay open={state.isOpen}>
        <Modal
          open={state.isOpen}
          onClose={state.close}
          dismissable={dismissable}
          keyboardDismissable={keyboardDismissable}
        >
          {dialog}
        </Modal>
      </Overlay>
    </DialogContext.Provider>
  );
};
