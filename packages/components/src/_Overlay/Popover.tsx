import React, { forwardRef, ReactNode, RefObject } from 'react';
import {
  AriaPopoverProps,
  DismissButton,
  usePopover,
} from '@react-aria/overlays';
import { OverlayTriggerState } from '@react-stately/overlays';
import { Overlay } from './Overlay';
import { Underlay } from './Underlay';
import { useObjectRef } from '@react-aria/utils';

export interface PopoverProps
  extends Pick<AriaPopoverProps, 'triggerRef' | 'scrollRef' | 'isNonModal'> {
  keyboardDismissDisabled?: AriaPopoverProps['isKeyboardDismissDisabled'];
  state: OverlayTriggerState;
  children: ReactNode;
}

//   /**
//    * Adjust size of the popover. This is used to make the popover
//    * at least the same width as its anchor element.
//    */
//   minWidth?: number | string;
// }

interface PopoverWrapperProps extends PopoverProps {}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (props, ref) => {
    const popoverRef = useObjectRef(ref);
    let { children, state, ...otherProps } = props;
    return (
      <Overlay open={state.isOpen} {...otherProps}>
        <PopoverWrapper ref={popoverRef} {...props}>
          {children}
        </PopoverWrapper>
      </Overlay>
    );
  }
);

const PopoverWrapper = forwardRef(
  (
    {
      children,
      isNonModal,
      state,
      keyboardDismissDisabled,
      ...props
    }: PopoverWrapperProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    const { popoverProps, underlayProps } = usePopover(
      {
        ...props,
        isNonModal,
        isKeyboardDismissDisabled: keyboardDismissDisabled,
        popoverRef: ref,
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
            minWidth: props.triggerRef.current
              ? (props.triggerRef.current as HTMLElement).offsetWidth
              : undefined,
          }}
          ref={ref}
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
