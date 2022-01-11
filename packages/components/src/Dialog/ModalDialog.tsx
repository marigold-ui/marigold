import React, { RefObject } from 'react';
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayProps,
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { AriaDialogProps } from '@react-types/dialog';

import { Box } from '../Box';

// Props
// ---------------
export type ModalDialogProps = {
  variant?: string;
  backdropVariant?: string;
} & OverlayProps &
  AriaDialogProps;

// Component
// ---------------
export const ModalDialog: React.FC<ModalDialogProps> = ({
  variant,
  backdropVariant = 'backdrop',
  children,
  ...props
}) => {
  const { isDismissable, isOpen, onClose, ...restProps } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = React.useRef<HTMLElement>() as RefObject<HTMLElement>;
  const { overlayProps, underlayProps } = useOverlay(
    { isDismissable, isOpen, onClose },
    ref
  );

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();

  const { modalProps } = useModal();
  const { dialogProps } = useDialog(props, ref);

  return (
    <Box
      __baseCSS={{
        display: 'grid',
        placeItems: 'center',
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      variant={`dialog.${backdropVariant}`}
      {...underlayProps}
    >
      <FocusScope contain restoreFocus autoFocus>
        <Box
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          variant={variant ? `dialog.${variant}` : `dialog`}
          {...restProps}
        >
          {children}
        </Box>
      </FocusScope>
    </Box>
  );
};
