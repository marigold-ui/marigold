import React, { forwardRef, ReactNode, useRef } from 'react';
import { OverlayProps, useModal, useOverlay } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';

import { Box } from '../Box';
import { Overlay } from './Overlay';

export interface PopoverProps
  extends Omit<
    OverlayProps,
    'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled'
  > {
  children?: ReactNode;
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissDisabled?: boolean;
}

export const Popover = forwardRef(
  (
    {
      children,
      open,
      dismissable,
      keyboardDismissDisabled,
      shouldCloseOnBlur,
      ...props
    }: PopoverProps,
    ref
  ) => {
    // FIXME: Why can't we use `useObjectRef` here?
    const fallbackRef = useRef(null);
    const popoverRef = ref || fallbackRef;
    const { overlayProps } = useOverlay(
      {
        isOpen: open,
        isDismissable: dismissable,
        isKeyboardDismissDisabled: keyboardDismissDisabled,
        shouldCloseOnBlur,
        ...props,
      },
      popoverRef as any
    );
    /**
     * Hide content outside the container from screen readers.
     */
    const { modalProps } = useModal({});

    return (
      <Overlay open={open}>
        <Box
          ref={popoverRef}
          role="presentation"
          {...mergeProps(props, overlayProps, modalProps)}
        >
          {children}
        </Box>
      </Overlay>
    );
  }
);
