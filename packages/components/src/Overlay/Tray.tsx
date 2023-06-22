import React from 'react';
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
export interface TrayProps
  extends AriaModalOverlayProps,
    StyleProps,
    OverlayProps {
  children: ReactNode;
  state: OverlayTriggerState;
}

interface TrayWrapperProps extends TrayProps {}

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
  ({ children, state, ...props }, ref: RefObject<HTMLDivElement>) => {
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
          <div
            {...modalProps}
            ref={ref}
            className="absolute bottom-0 w-full"
            data-testid="tray"
          >
            <DismissButton onDismiss={state.close} />
            {children}
            <DismissButton onDismiss={state.close} />
          </div>
        </Underlay>
      </FocusScope>
    );
  }
);
