import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { ReactElement, ReactNode, useRef } from 'react';
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
  onOpenChange,
}: DialogControllerProps) => {
  const childArray = React.Children.toArray(children);
  if (childArray.length > 1) {
    throw new Error('Only a single child can be passed to DialogController.');
  }

  const lastChild = useRef<ReactElement | null>(null);
  const child = React.isValidElement(childArray[0]) ? childArray[0] : null;
  if (child) {
    lastChild.current = child;
  }

  const state = useOverlayTriggerState({
    isOpen: !!child,
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
          {lastChild.current}
        </Modal>
      </Overlay>
    </DialogContext.Provider>
  );
};
