import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Modal } from 'react-aria-components';

// Props
// ---------------
export interface ModalProps extends RAC.ModalOverlayProps {
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}

// Component
// ---------------
const _Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, dismissable, keyboardDismissable, ...rest }, ref) => {
    const props: RAC.ModalOverlayProps = {
      isOpen: open,
      isDismissable: dismissable,
      isKeyboardDismissDisabled: keyboardDismissable,
      ...rest,
    };
    return (
      <Modal ref={ref} {...props}>
        {props.children}
      </Modal>
    );
  }
);

export { _Modal as Modal };
