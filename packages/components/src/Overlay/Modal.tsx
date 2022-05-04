import React, { forwardRef, ReactNode } from 'react';
import { FocusScope } from '@react-aria/focus';
import {
  OverlayProps,
  useModal,
  useOverlay,
  usePreventScroll,
} from '@react-aria/overlays';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { Overlay } from './Overlay';
import { Underlay } from './Underlay';
import { Box } from '@marigold/system';

// Props
// ---------------
export interface ModalProps
  extends Omit<
    OverlayProps,
    'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled'
  > {
  children?: ReactNode;
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissDisabled?: boolean;
}

// Component
// ---------------
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, open, dismissable, keyboardDismissDisabled, ...props }, ref) => {
    // FIXME: Do we have to pass variant and size to the Underlay?
    const modalRef = useObjectRef(ref);
    const { overlayProps, underlayProps } = useOverlay(
      {
        isOpen: open,
        isDismissable: dismissable,
        isKeyboardDismissDisabled: keyboardDismissDisabled,
        ...props,
      },
      modalRef
    );

    /**
     * Prevent scrolling in the background and hide content
     * outside the container from screen readers.
     */
    usePreventScroll();
    const { modalProps } = useModal({});

    return (
      <Overlay open={open}>
        <Underlay {...underlayProps} />
        <FocusScope contain restoreFocus autoFocus>
          <Box
            __baseCSS={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
            }}
            ref={modalRef}
            role="presentation"
            {...mergeProps(props, overlayProps, modalProps)}
          >
            {children}
          </Box>
        </FocusScope>
      </Overlay>
    );
  }
);
