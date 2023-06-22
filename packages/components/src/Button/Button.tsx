import React, { forwardRef, ReactNode } from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { FocusableDOMProps, PressEvents } from '@react-types/shared';

import { cn, useClassNames, useStateProps } from '@marigold/system';
import { HtmlProps, PolymorphicComponent, PropsOf } from '@marigold/types';

// Props
// ---------------
export interface ButtonOwnProps
  extends PressEvents,
    FocusableDOMProps,
    HtmlProps<'button'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
  fullWidth?: boolean;
}

export interface ButtonProps extends PropsOf<typeof Button> {}

// Component
// ---------------
export const Button = forwardRef(
  (
    {
      as = 'button',
      children,
      variant,
      size,
      disabled,
      onClick,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      fullWidth,
      excludeFromTabOrder,
      className,
      ...props
    },
    ref
  ) => {
    const Component = as;
    const buttonRef = useObjectRef<HTMLButtonElement>(ref as any);
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { isFocusVisible, focusProps } = useFocusRing({
      autoFocus: props.autoFocus,
    });
    const { buttonProps, isPressed } = useButton(
      {
        /**
         * `react-aria` only expected `Element` but we casted
         * it to a `HTMLButtonElement` internally.
         */
        ...(props as any),
        onClick,
        onPress,
        onPressStart,
        onPressEnd,
        onPressChange,
        onPressUp,
        elementType: typeof as === 'string' ? as : 'span',
        isDisabled: disabled,
        excludeFromTabOrder,
      },
      buttonRef
    );

    const classNames = useClassNames({
      component: 'Button',
      variant,
      size,
      className,
    });

    const stateProps = useStateProps({
      active: isPressed,
      focusVisible: isFocusVisible,
      hover: isHovered,
    });

    return (
      <Component
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
        {...stateProps}
        ref={buttonRef}
        className={cn(classNames, fullWidth ? 'w-full' : undefined)}
      >
        {children}
      </Component>
    );
  }
) as PolymorphicComponent<'button', ButtonOwnProps>;
