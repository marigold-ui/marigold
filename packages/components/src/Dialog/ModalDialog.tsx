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

export type ModalDialogProps = OverlayProps & AriaDialogProps;

export const ModalDialog: React.FC<ModalDialogProps> = ({
  children,
  ...props
}) => {
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = React.useRef<HTMLElement>() as RefObject<HTMLElement>;
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();

  const { modalProps } = useModal();
  const { dialogProps } = useDialog(props, ref);

  return (
    <Box variant="dialog.modalWrapper" {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <Box
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          variant="dialog.modalBody"
        >
          {children}
        </Box>
      </FocusScope>
    </Box>
  );
};
