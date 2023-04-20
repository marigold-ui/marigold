import React, { forwardRef, ReactNode } from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { PressEvents } from '@react-types/shared';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import { Box, useComponentStylesFromTV, useStateProps } from '@marigold/system';
import { HtmlProps, PolymorphicComponent, PropsOf } from '@marigold/types';

// Props
// ---------------
export interface ButtonOwnProps extends PressEvents, HtmlProps<'button'> {
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
      ...props
    },
    ref
  ) => {
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
      },
      buttonRef
    );

    const classNames = useComponentStylesFromTV('Button', { variant, size });

    const stateProps = useStateProps({
      active: isPressed,
      focusVisible: isFocusVisible,
      hover: isHovered,
    });

    const styledButton = tv({
      base: [
        'inline-flex items-center justify-center gap-[0.5ch]',
        'cursor-pointer disabled:cursor-not-allowed ',
        fullWidth ? 'w-full' : undefined,
        'focus:outline-0',
      ],
    });

    return (
      <Box
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
        {...stateProps}
        as={as}
        ref={buttonRef}
        className={twMerge(styledButton(), classNames)}
      >
        {children}
      </Box>
    );
  }
) as PolymorphicComponent<'button', ButtonOwnProps>;
