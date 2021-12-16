import React, { forwardRef, RefObject } from 'react';
import { useButton } from '@react-aria/button';
import {
  PolymorphicComponentWithRef,
  PolymorphicPropsWithRef,
} from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';

// Theme Extension
// ---------------
export interface ButtonThemeExtension<Value> {
  button?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type ButtonProps = PolymorphicPropsWithRef<BoxOwnProps, 'button'>;

// Component
// ---------------
export const Button: PolymorphicComponentWithRef<BoxOwnProps, 'button'> =
  forwardRef(
    (
      {
        as = 'button',
        variant = 'primary',
        size = 'large',
        space = 'none',
        disabled,
        children,
        className,
        ...props
      },
      ref
    ) => {
      const { buttonProps } = useButton(
        {
          ...props,
          elementType: typeof as === 'string' ? as : 'span',
          isDisabled: disabled,
        },
        ref as RefObject<HTMLSpanElement>
      );

      return (
        <Box
          {...buttonProps}
          {...props}
          as={as}
          display="inline-flex"
          alignItems="center"
          variant={[`button.${variant}`, `button.${size}`]}
          className={className}
          ref={ref}
          css={{ columnGap: space }}
        >
          {children}
        </Box>
      );
    }
  );
