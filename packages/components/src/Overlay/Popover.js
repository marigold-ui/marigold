import React, { forwardRef, useRef } from 'react';
import { useModal, useOverlay } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import { Box } from '../Box';
import { Overlay } from './Overlay';
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
    },
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
      popoverRef
    );
    /**
     * Hide content outside the container from screen readers.
     */
    const { modalProps } = useModal({});
    /**
     * Fit size to anchor element if children contents is smaller.
     */
    const style = { minWidth };
    return React.createElement(
      Overlay,
      { open: open },
      React.createElement(
        Box,
        {
          ref: popoverRef,
          role: 'presentation',
          ...mergeProps(props, overlayProps, modalProps, style),
        },
        children
      )
    );
  }
);
//# sourceMappingURL=Popover.js.map
