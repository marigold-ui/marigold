import React from 'react';
import { ComponentProps } from '@marigold/types';
import {
  OverlayTriggerState,
  useOverlayTriggerState,
} from '@react-stately/overlays';
import { OverlayContainer } from '@react-aria/overlays';
import { useButton } from '@react-aria/button';
import { LegacyRef, RefObject } from 'react-helmet/node_modules/@types/react';
import { Close } from '@marigold/icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

import { ModalDialog } from './ModalDialog';

export type DialogProps = {
  onClose?: ComponentProps<typeof Button>['onClick'];
  title?: string;
} & OverlayTriggerState &
  ComponentProps<'div'>;

export const Dialog: React.FC<DialogProps> = ({
  onClose,
  children,
  title,
  className,
  ...props
}) => {
  const closeButtonRef = React.useRef<HTMLElement>() as RefObject<HTMLElement>;

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => props.close(),
    },
    closeButtonRef
  );

  return (
    <OverlayContainer>
      <ModalDialog isOpen onClose={props.close} isDismissable>
        <Box variant="dialog.wrapper" className={className} {...props}>
          <Box display="flex" justifyContent="space-between">
            <Box variant="dialog.body">
              <Box pb="xsmall">
                <Text>{title}</Text>
              </Box>
              {children}
            </Box>
            <Box variant="dialog.onClose">
              <Button
                variant="close"
                size="xsmall"
                {...closeButtonProps}
                ref={closeButtonRef as LegacyRef<HTMLButtonElement>}
              >
                <Close size={16} />
              </Button>
            </Box>
          </Box>
        </Box>
      </ModalDialog>
    </OverlayContainer>
  );
};

// use this hook to get the overlayTriggerState and Button props for using the dialog component9i
export const useDialogButtonProps = () => {
  const state = useOverlayTriggerState({});
  const openButtonRef = React.useRef<HTMLElement>() as RefObject<HTMLElement>;
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef
  );

  return { state, openButtonProps, openButtonRef };
};
