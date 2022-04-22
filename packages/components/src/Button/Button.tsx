import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
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
      ref
    ) => {
      const buttonRef = useRef(null);
      // FIXME
      useImperativeHandle(ref, () => buttonRef.current);

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

      const { isFocusVisible, focusProps } = useFocusRing();
      const styles = useComponentStyles('Button', { variant, size });
      const stateProps = useStateProps({
        active: isPressed,
        focus: isFocusVisible,
      });

      return (
        <Box
          {...mergeProps(buttonProps, focusProps)}
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
