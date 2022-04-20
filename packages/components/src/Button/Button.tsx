import React, { ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';

import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';
import { PolymorphicComponent, PolymorphicProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface ButtonThemeExtension extends ThemeExtension<'Button'> {}

// Props
// ---------------
export interface ButtonOwnProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

export interface ButtonProps
  extends PolymorphicProps<ButtonOwnProps, 'button'> {}

// Component
// ---------------
export const Button = (({
  as = 'button',
  children,
  variant,
  size,
  disabled,
  ...props
}: ButtonProps) => {
  const styles = useComponentStyles('Button', { variant, size });

  const ref = useRef<any>();
  const { buttonProps } = useButton(
    {
      /**
       * `react-aria` only expected `Element` but our
       * props are from HTMLButtonElement.
       */
      ...(props as any),
      elementType: typeof as === 'string' ? as : 'span',
      isDisabled: disabled,
    },
    ref
  );

  return (
    <Box
      {...buttonProps}
      as={as}
      ref={ref}
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
}) as PolymorphicComponent<ButtonOwnProps, 'button'>;
