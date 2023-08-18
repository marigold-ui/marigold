import React, { ReactNode } from 'react';

import { useOverlayTriggerState } from '@react-stately/overlays';

import { Modal, Overlay } from '../Overlay';
import { DialogContext } from './Context';

export interface DialogControllerProps {
  children: ReactNode;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const DialogController = ({
  children,
  dismissable = true,
  keyboardDismissable = true,
  open,
  onOpenChange,
}: DialogControllerProps) => {
  const state = useOverlayTriggerState({
    isOpen: open,
    onOpenChange,
  });

  const ctx = { open: state.isOpen, close: state.close };

  return (
    <DialogContext.Provider value={ctx}>
      <Overlay open={state.isOpen}>
        <Modal
          open={state.isOpen}
          onClose={state.close}
          dismissable={dismissable}
          keyboardDismissable={keyboardDismissable}
        >
          {children}
        </Modal>
      </Overlay>
    </DialogContext.Provider>
  );
};
