import React, { RefObject } from 'react';
import { ComponentProps } from '@marigold/types';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { OverlayContainer } from '@react-aria/overlays';
import { useButton } from '@react-aria/button';
import { Close } from '@marigold/icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';

import { ModalDialog } from './ModalDialog';

// Theme Extension
// ---------------
export interface DialogThemeExtension<Value> {
  dialog?: {
    wrapper?: Value;
    body?: Value;
    onClose?: Value;
    modalWrapper?: Value;
    modalBody?: Value;
  };
}

// Props
// ---------------
export type DialogProps = {
  isOpen: boolean;
  close: ComponentProps<typeof Button>['onClick'];
  title?: string;
} & ComponentProps<'div'>;

// Component
// ---------------
export const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  className,
  isOpen,
  close,
  ...props
}) => {
  const closeButtonRef = React.useRef<HTMLElement>() as RefObject<HTMLElement>;

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => close(),
    },
    closeButtonRef
  );

  return (
    <OverlayContainer>
      <ModalDialog isOpen={isOpen} onClose={close} isDismissable>
        <Box variant="dialog.wrapper" className={className} {...props}>
          <Box variant="dialog.body">
            {title && (
              <Heading as="h4" variant="h4">
                {title}
              </Heading>
            )}
            {children}
          </Box>
          <Box variant="dialog.onClose">
            <Button
              variant="close"
              size="xsmall"
              {...closeButtonProps}
              ref={closeButtonRef}
            >
              <Close size={16} />
            </Button>
          </Box>
        </Box>
      </ModalDialog>
    </OverlayContainer>
  );
};

// use this hook to get the overlayTriggerState and openButton props for using the dialog component
export const useDialogButtonProps = () => {
  const state = useOverlayTriggerState({});
  const openButtonRef = React.useRef<HTMLElement>() as RefObject<HTMLElement>;
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef
  );

  return {
    state,
    openButtonProps,
    openButtonRef,
  };
};
