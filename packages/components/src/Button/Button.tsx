import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import { useButton } from '@react-aria/button';
import { PressEvents } from '@react-types/shared';

import {
  Box,
  ThemeExtension,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import {
  PolymorphicComponentWithRef,
  PolymorphicPropsWithRef,
} from '@marigold/types';

// Theme Extension
// ---------------
export interface ButtonThemeExtension extends ThemeExtension<'Button'> {}

// Props
// ---------------
export interface ButtonOwnProps extends PressEvents {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

export interface ButtonProps
  extends PolymorphicPropsWithRef<ButtonOwnProps, 'button'> {}

// Component
// ---------------
export const Button: PolymorphicComponentWithRef<ButtonOwnProps, 'button'> =
  forwardRef(
    (
      {
        as = 'button',
        children,
        variant,
        size,
        disabled,
        ...props
      }: Omit<ButtonProps, 'ref'>,
      forwardRef
    ) => {
      const buttonRef = useRef(null);
      // FIXME
      useImperativeHandle(forwardRef, () => buttonRef.current);

      const { buttonProps, isPressed } = useButton(
        {
          /**
           * `react-aria` only expected `Element` but our
           * props are from `HTMLButtonElement` 🤫
           */
          ...(props as any),
          elementType: typeof as === 'string' ? as : 'span',
          isDisabled: disabled,
        },
        buttonRef
      );

      const styles = useComponentStyles('Button', { variant, size });
      const stateProps = useStateProps({
        active: isPressed,
      });

      return (
        <Box
          {...buttonProps}
          {...stateProps}
          as={as}
          ref={buttonRef}
          __baseCSS={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5ch',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          css={styles}
        >
          {children}
        </Box>
      );
    }
  );
