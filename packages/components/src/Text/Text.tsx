import React, { forwardRef } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';
import {
  PolymorphicComponentWithRef,
  PolymorphicPropsWithRef,
} from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';

// Theme Extension
// ---------------
export interface TextThemeExtension<Value> {
  text?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type TextOwnProps = {
  align?: ResponsiveStyleValue<string>;
  color?: ResponsiveStyleValue<string>;
  cursor?: ResponsiveStyleValue<string>;
  outline?: ResponsiveStyleValue<string>;
  userSelect?: ResponsiveStyleValue<string>;
} & BoxOwnProps;

export type TextProps = PolymorphicPropsWithRef<TextOwnProps, 'span'>;

// Component
// ---------------
export const Text: PolymorphicComponentWithRef<TextOwnProps, 'span'> =
  forwardRef(
    (
      {
        as = 'span',
        variant = 'body',
        children,
        className,
        align,
        color,
        cursor,
        outline,
        userSelect,
        ...props
      },
      ref
    ) => (
      <Box
        {...props}
        as={as}
        variant={`text.${variant}`}
        css={{ textAlign: align, color, cursor, outline, userSelect }}
        className={className}
        ref={ref}
      >
        {children}
      </Box>
    )
  );
