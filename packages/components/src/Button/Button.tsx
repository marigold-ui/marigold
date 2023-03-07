import React, { forwardRef, ReactNode } from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { PressEvents } from '@react-types/shared';
import { twMerge } from 'tailwind-merge';

import {
  Box,
  ThemeExtension,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { HtmlProps, PolymorphicComponent, PropsOf } from '@marigold/types';

// Theme Extension
// ---------------
export interface ButtonThemeExtension extends ThemeExtension<'Button'> {}

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

    //  const styles = useComponentStyles('Button', { variant, size });

    const classes = useComponentStyles('Button', {
      variant: variant,
      // size: size,
    });

    // use TailwindMerge to merge the classnames
    const classNames = twMerge(classes.baseStyle, classes.variant);
    console.log('classNames', classNames);

    const stateProps = useStateProps({
      active: isPressed,
      focusVisible: isFocusVisible,
      hover: isHovered,
    });

    return (
      <Box
        {...mergeProps(buttonProps, focusProps, hoverProps, props)}
        {...stateProps}
        as={as}
        ref={buttonRef}
        __baseCSS={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5ch',
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: fullWidth ? '100%' : undefined,
          '&:focus': {
            outline: 0,
          },
        }}
        className={classNames}
      >
        {children}
      </Box>
    );
  }
) as PolymorphicComponent<'button', ButtonOwnProps>;
