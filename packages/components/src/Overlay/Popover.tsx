import React, { forwardRef, ReactNode, useRef } from 'react';
import { AriaOverlayProps, useModal, useOverlay } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';

import { Box } from '../Box';
import { Overlay } from './Overlay';

export interface PopoverProps
  extends Omit<
    AriaOverlayProps,
    'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled'
  > {
  children?: ReactNode;
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissDisabled?: boolean;

  /**
   * Adjust size of the popover. This is used to make the popover
   * at least the same width as its anchor element.
   */
  minWidth?: number | string;
}

export const Popover = forwardRef(
  (
    {
      children,
      open,
      dismissable,
      keyboardDismissDisabled,
      shouldCloseOnBlur,
      minWidth = 0,
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

    /**
     * Fit size to anchor element if children contents is smaller.
     */
    const style = { minWidth };

    return (
      <Overlay open={open}>
        <Box
          ref={popoverRef}
          role="presentation"
          {...mergeProps(props, overlayProps, modalProps, style)}
        >
          {children}
        </Box>
      </Overlay>
    );
  }
);
