import { ReactNode, RefObject, forwardRef, useRef } from 'react';

import { FocusScope } from '@react-aria/focus';
import {
  AriaPopoverProps,
  DismissButton,
  usePopover,
} from '@react-aria/overlays';

import { OverlayTriggerState } from '@react-stately/overlays';

import { cn, useClassNames } from '@marigold/system';

import { Overlay } from './Overlay';
import { Underlay } from './Underlay';

export interface PopoverProps
  extends Pick<AriaPopoverProps, 'triggerRef' | 'scrollRef' | 'isNonModal'> {
  keyboardDismissDisabled?: AriaPopoverProps['isKeyboardDismissDisabled'];
  state: OverlayTriggerState;
  children: ReactNode;
}

interface PopoverWrapperProps extends PopoverProps {}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (props, ref) => {
    const fallbackRef = useRef(null);
    const popoverRef = ref || fallbackRef;
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
    const { popoverProps, underlayProps, placement } = usePopover(
      {
        ...props,
        isNonModal,
        isKeyboardDismissDisabled: keyboardDismissDisabled,
        popoverRef: ref,
        placement: 'bottom left',
      },
      state
    );
    const classNames = useClassNames({
      component: 'Popover',
      variant: placement,
    });

    return (
      <FocusScope restoreFocus>
        {!isNonModal && <Underlay {...underlayProps} />}
        <div
          {...popoverProps}
          className={cn(
            'flex flex-col sm:max-h-[75vh] lg:max-h-[45vh]',
            classNames
          )}
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
      </FocusScope>
    );
  }
);
