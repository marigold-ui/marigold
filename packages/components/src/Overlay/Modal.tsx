import { forwardRef, useEffect, useState } from 'react';
import type RAC from 'react-aria-components';
import { Modal } from 'react-aria-components';

import { OverlayContainer } from '@react-aria/overlays';

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
  const props: RAC.ModalOverlayProps = {
    isOpen: open,
    isDismissable: dismissable,
    isKeyboardDismissDisabled: keyboardDismissable,
    ...rest,
  };

  const [portal, setPortal] = useState<Element | null>(null);

  // used useEffect because otherwise the document is not defined
  useEffect(() => {
    let container = document.getElementById('portalContainer') ?? document.body;
    setPortal(container);
  }, []);

  console.log(portal);
  return (
    <Underlay
      dismissable={dismissable}
      keyboardDismissable={keyboardDismissable}
      open={open}
      variant="modal"
      UNSTABLE_portalContainer={portal as Element}
    >
      <Modal ref={ref} {...props}>
        {props.children}
      </Modal>
    </Underlay>
  );
});

export { _Modal as Modal };
