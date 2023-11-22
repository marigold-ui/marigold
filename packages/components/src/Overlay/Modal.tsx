import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Modal } from 'react-aria-components';

import { useTheme } from '@marigold/system';

import { Underlay } from './Underlay';

// Props
// ---------------
export interface ModalProps extends RAC.ModalOverlayProps {
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}

// Component
// ---------------
const _Modal = forwardRef<
  HTMLDivElement,
  Omit<
    ModalProps,
    'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled' | 'className'
  >
>(({ open, dismissable, keyboardDismissable, ...rest }, ref) => {
  const theme = useTheme();
  const props: RAC.ModalOverlayProps = {
    isOpen: open,
    isDismissable: dismissable,
    isKeyboardDismissDisabled: keyboardDismissable,
    ...rest,
  };
  return (
    <Underlay
      dismissable={dismissable}
      keyboardDismissable={keyboardDismissable}
      open={open}
      variant="modal"
    >
      <Modal ref={ref} data-theme={theme.name} {...props}>
        {props.children}
      </Modal>
    </Underlay>
  );
});

export { _Modal as Modal };
