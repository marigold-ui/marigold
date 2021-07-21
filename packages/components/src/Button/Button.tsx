import React, { forwardRef, ReactElement, RefObject } from 'react';
import { useButton } from '@react-aria/button';
import {
  PolymorphicComponentWithRef,
  PolymorphicPropsWithRef,
} from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';

export type ButtonOwnProps = { icon?: ReactElement };
export type ButtonProps = PolymorphicPropsWithRef<BoxOwnProps, 'button'>;

export const Button: PolymorphicComponentWithRef<BoxOwnProps, 'button'> =
  forwardRef(
    (
      {
        as = 'button',
        variant = 'primary',
        size = 'large',
        disabled,
        children,
        icon,
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
          variant={[`button.${variant}`, `button.${size}`]}
          className={className}
          ref={ref}
        >
          {icon ? (
            <>
              {icon}
              {children}
            </>
          ) : (
            // children
            <Box as="span" display="inline-flex" alignItems="center">
              {children}
            </Box>
          )}
        </Box>
      );
    }
  );
