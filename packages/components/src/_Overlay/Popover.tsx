import React, { forwardRef, ReactNode, RefObject, useRef } from 'react';
import {
  AriaOverlayProps,
  DismissButton,
  usePopover,
} from '@react-aria/overlays';
import { OverlayTriggerState } from '@react-stately/overlays';
import { DOMRef, StyleProps } from '@react-types/shared';
import { Overlay } from './Overlay';
import { Underlay } from '../Overlay';

export interface PopoverProps
  extends Omit<
    AriaOverlayProps,
    | 'isOpen'
    | 'isDismissable'
    | 'isKeyboardDismissDisabled'
    | 'popoverRef'
    | 'maxHeight'
  > {
  children?: ReactNode;
  dismissable?: boolean;
  open?: boolean;
  keyboardDismissDisabled?: boolean;
  hideArrow?: boolean;
  state?: OverlayTriggerState;
  ref: RefObject<HTMLDivElement>;

  /**
   * Adjust size of the popover. This is used to make the popover
   * at least the same width as its anchor element.
   */
  minWidth?: number | string;
}

interface PopoverWrapperProps extends PopoverProps {
  isOpen?: boolean;
  isNonModal?: boolean;
}

export const Popover = ({ children, state, ref, ...props }: PopoverProps) => {
  const fallbackRef = useRef(null);
  const popoverRef = ref || fallbackRef;
  return (
    <Overlay open={state.isOpen}>
      <PopoverWrapper ref={popoverRef as any} {...props}>
        {children}
      </PopoverWrapper>
    </Overlay>
  );
};

const PopoverWrapper = forwardRef(
  ({
    children,
    isOpen,
    hideArrow,
    isNonModal,
    state,
    ref,
    ...props
  }: PopoverWrapperProps) => {
    let { popoverProps, underlayProps } = usePopover(
      {
        ...props,
        popoverRef: ref,
        triggerRef: ref,
        placement: 'bottom left',
      },
      state
    );

    return (
      <>
        {!isNonModal && <Underlay {...underlayProps} />}
        <div
          {...popoverProps}
          style={{
            ...popoverProps.style,
          }}
          ref={ref}
          role="presentation"
          data-testid="popover"
        >
          {!isNonModal && <DismissButton onDismiss={state.close} />}
          {children}

          <DismissButton onDismiss={state.close} />
        </div>
      </>
    );
  }
);
