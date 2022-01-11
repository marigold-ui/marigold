import React, { RefObject } from 'react';
import { ComponentProps } from '@marigold/types';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { OverlayContainer } from '@react-aria/overlays';
import { useButton } from '@react-aria/button';
import { Close } from '@marigold/icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

import { ModalDialog, ModalDialogProps } from './ModalDialog';

// Props
// ---------------
export type DialogProps = {
  backdropVariant?: string;
  close: ComponentProps<typeof Button>['onClick'];
  isOpen: boolean;
  title?: string;
  variant?: string;
} & ModalDialogProps &
  ComponentProps<'div'>;

// Component
// ---------------
export const Dialog: React.FC<DialogProps> = ({
  backdropVariant,
  children,
  className,
  close,
  isOpen,
  title,
  variant,
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
      <ModalDialog
        variant={variant}
        backdropVariant={backdropVariant}
        isOpen={isOpen}
        onClose={close}
        isDismissable
        {...props}
      >
        <Box
          __baseCSS={{
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 'small',
            pl: 'large',
            pb: 'large',
          }}
          className={className}
        >
          <Box pt="medium">
            {title && (
              <Text as="h4" variant="headline4">
                {title}
              </Text>
            )}
            {children}
          </Box>
          <Box
            __baseCSS={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'start',
              paddingTop: 'xsmall',
              paddingX: 'xsmall',
            }}
          >
            <Box
              as={Button}
              __baseCSS={{
                color: 'text',
                bg: 'transparent',
                lineHeight: 'xsmall',
                px: 'xxsmall',
                ':hover': {
                  color: 'text',
                  bg: 'transparent',
                  cursor: 'pointer',
                },
                ':focus': {
                  outline: 0,
                },
              }}
              {...closeButtonProps}
              ref={closeButtonRef}
            >
              <Close size={16} />
            </Box>
          </Box>
        </Box>
      </ModalDialog>
    </OverlayContainer>
  );
};

// get the overlayTriggerState and openButton props for using the dialog component
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
