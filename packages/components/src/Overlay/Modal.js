import React, { forwardRef } from 'react';
import { FocusScope } from '@react-aria/focus';
import { useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { Underlay } from './Underlay';
// Component
// ---------------
export const Modal = forwardRef(
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
    return React.createElement(
      FocusScope,
      { contain: true, restoreFocus: true, autoFocus: true },
      React.createElement(Underlay, { ...underlayProps }),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
          },
          ref: modalRef,
          ...mergeProps(props, overlayProps, modalProps),
        },
        React.createElement(
          'div',
          { style: { pointerEvents: 'auto' } },
          children
        )
      )
    );
  }
);
//# sourceMappingURL=Modal.js.map
