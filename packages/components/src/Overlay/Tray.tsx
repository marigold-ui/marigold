import React from 'react';
import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';
import { FocusScope } from '@react-aria/focus';
import {
  AriaModalOverlayProps,
  DismissButton,
  OverlayProps,
  useModalOverlay,
} from '@react-aria/overlays';
import { useObjectRef } from '@react-aria/utils';
import { OverlayTriggerState } from '@react-stately/overlays';
import { StyleProps } from '@react-types/shared';
import { forwardRef, ReactNode, RefObject } from 'react';
import { Overlay } from './Overlay';
import { Underlay } from './Underlay';

// Props
// ---------------
interface TrayProps extends AriaModalOverlayProps, StyleProps, OverlayProps {
  children: ReactNode;
  state: OverlayTriggerState;
  size?: string;
  variant?: string;
}

interface TrayWrapperProps extends TrayProps {}

// Theme Extension
// ---------------
export interface TrayThemeExtension extends ThemeExtension<'Tray'> {}

// Component
// ---------------
export const Tray = forwardRef<HTMLDivElement, TrayProps>(
  ({ state, children, ...props }, ref) => {
    const trayRef = useObjectRef(ref);
    return (
      <Overlay open={state.isOpen}>
        <TrayWrapper state={state} {...props} ref={trayRef}>
          {children}
        </TrayWrapper>
      </Overlay>
    );
  }
);

export const TrayWrapper = forwardRef<HTMLDivElement, TrayWrapperProps>(
  (
    { children, state, size, variant, ...props },
    ref: RefObject<HTMLDivElement>
  ) => {
    const styles = useComponentStyles('Tray', { size, variant });
    let { modalProps, underlayProps } = useModalOverlay(
      {
        ...props,
        isDismissable: true,
      },
      state,
      ref
    );
    return (
      <FocusScope contain restoreFocus autoFocus>
        <Underlay {...underlayProps} variant="modal">
          <Box {...modalProps} ref={ref} css={styles} data-testid="tray">
            <DismissButton onDismiss={state.close} />
            {children}
            <DismissButton onDismiss={state.close} />
          </Box>
        </Underlay>
      </FocusScope>
    );
  }
);
