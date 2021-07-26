import React, { forwardRef, RefObject } from 'react';
import { FocusScope } from '@react-aria/focus';
import {
  DismissButton,
  OverlayContainer,
  useModal,
  useOverlay,
} from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';

import { Box } from '../Box';

interface PopoverProps {
  isOpen?: boolean;
  onClose: () => void;
  ref?: React.Ref<HTMLDivElement>;
  className: string;
}

export const Popover: React.FC<PopoverProps> = forwardRef(
  ({ children, className, isOpen, onClose, ...otherProps }, ref) => {
    // Handle events that should cause the popup to close,
    const { overlayProps } = useOverlay(
      {
        isOpen,
        onClose,
        shouldCloseOnBlur: true,
        isDismissable: true,
      },
      ref as RefObject<HTMLElement>
    );
    // Hide content outside the modal from screen readers.
    const { modalProps } = useModal();

    return (
      <OverlayContainer>
        <FocusScope restoreFocus>
          <Box
            {...mergeProps(overlayProps, otherProps, modalProps)}
            className={className}
            ref={ref}
          >
            {children}
            <DismissButton onDismiss={onClose} />
          </Box>
        </FocusScope>
      </OverlayContainer>
    );
  }
);
