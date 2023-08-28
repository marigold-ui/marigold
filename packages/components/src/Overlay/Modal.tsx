import { HTMLAttributes, ReactNode, forwardRef } from 'react';

import { FocusScope } from '@react-aria/focus';
import { useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { mergeProps, useObjectRef } from '@react-aria/utils';

import { Underlay } from './Underlay';

// Props
// ---------------
export interface ModalProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}

// Component
// ---------------
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    { children, open, dismissable, keyboardDismissable, onClose, ...props },
    ref
  ) => {
    // FIXME: Do we have to pass variant and size to the Underlay?
    const modalRef = useObjectRef(ref);
    const { overlayProps, underlayProps } = useOverlay(
      {
        isOpen: open,
        onClose,
        isDismissable: dismissable,
        isKeyboardDismissDisabled: !keyboardDismissable,
      },
      modalRef
    );

    /**
     * Prevent scrolling in the background and hide content
     * outside the container from screen readers.
     */
    usePreventScroll();
    const { modalProps } = useModal({});

    /**
     * In order to support opacity on the `<Unverlay>` it can't wrap
     * the modal content. BUT, we need to center the modal content and still
     * be able to click the `<Underlay>` (has the on close listener).
     *
     * Solution:
     *  - Make a wrapper that centers the modal content, but is not clickable
     *    (`pointer-events: none`)
     *  - Make another wrapper the "re-enables" pointer events on the modal
     *    content.
     */
    return (
      <FocusScope contain restoreFocus autoFocus>
        <Underlay {...underlayProps} variant="modal" />
        <div
          className="pointer-none fixed inset-0 z-50 flex items-center justify-center"
          ref={modalRef}
          {...mergeProps(props, overlayProps, modalProps)}
        >
          <div style={{ pointerEvents: 'auto' }}>{children}</div>
        </div>
      </FocusScope>
    );
  }
);
