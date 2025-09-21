import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Modal } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { Underlay } from './Underlay';

// Props
// ---------------
export interface ModalProps extends RAC.ModalOverlayProps {
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
  size?: string;
}

// Component
// ---------------
const _Modal = forwardRef<
  HTMLDivElement,
  Omit<
    ModalProps,
    'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled' | 'className'
  >
>(
  (
    {
      size,
      open,
      dismissable,
      keyboardDismissable,
      onOpenChange,
      children,
      ...props
    },
    ref
  ) => {
    const className = useClassNames({ component: 'Modal', size });
    return (
      <Underlay
        dismissable={dismissable}
        keyboardDismissable={keyboardDismissable}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Modal {...props} className={className} ref={ref}>
          {children}
        </Modal>
      </Underlay>
    );
  }
);

export { _Modal as Modal };
