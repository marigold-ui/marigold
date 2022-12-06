import React, { forwardRef, ReactNode, RefObject, useRef } from 'react';
import {
  AriaPopoverProps,
  DismissButton,
  usePopover,
} from '@react-aria/overlays';
import { OverlayTriggerState } from '@react-stately/overlays';
import { Overlay } from './Overlay';
import { Underlay } from './Underlay';

export interface PopoverProps
  extends Omit<
    AriaPopoverProps,
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
  state: OverlayTriggerState;
  shouldCloseOnBlur: boolean;

  /**
   * Adjust size of the popover. This is used to make the popover
   * at least the same width as its anchor element.
   */
  minWidth?: number | string;
}

interface PopoverWrapperProps extends PopoverProps {
  isOpen?: boolean;
}

export const Popover = ({ ...props }: PopoverProps) => {
  const popoverRef = useRef(null);
  let { children, state, ...otherProps } = props;
  return (
    <Overlay open={state.isOpen} {...otherProps}>
      <PopoverWrapper ref={popoverRef as any} {...props}>
        {children}
      </PopoverWrapper>
    </Overlay>
  );
};

const PopoverWrapper = forwardRef(
  (
    {
      children,
      isOpen,
      hideArrow,
      isNonModal,
      state,
      ...props
    }: PopoverWrapperProps,
    ref
  ) => {
    let { popoverProps, underlayProps } = usePopover(
      {
        ...props,
        popoverRef: ref as RefObject<HTMLDivElement>,
        placement: 'bottom left',
      },
      state
    );

    // what is with maxHeight

    return (
      <>
        {!isNonModal && <Underlay {...underlayProps} />}
        <div
          {...popoverProps}
          style={{
            ...popoverProps.style,
          }}
          ref={ref as RefObject<HTMLDivElement>}
          role="presentation"
        >
          {!isNonModal && <DismissButton onDismiss={state.close} />}
          {children}

          <DismissButton onDismiss={state.close} />
        </div>
      </>
    );
  }
);
