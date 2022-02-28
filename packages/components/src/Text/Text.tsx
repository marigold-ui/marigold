import React, { forwardRef } from 'react';
import { ResponsiveStyleValue, Theme } from '@marigold/system';
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
export interface TextOwnProps extends BoxOwnProps {
  align?: ResponsiveStyleValue<string>;
  color?: ResponsiveStyleValue<string>;
  cursor?: ResponsiveStyleValue<string>;
  size?: ResponsiveStyleValue<keyof Theme['fontSizes'] | string>;
  outline?: ResponsiveStyleValue<string>;
  userSelect?: ResponsiveStyleValue<string>;
}

export interface TextProps
  extends PolymorphicPropsWithRef<TextOwnProps, 'span'> {}

// Component
// ---------------
export const Text: PolymorphicComponentWithRef<TextOwnProps, 'span'> =
  forwardRef(
    (
      {
        as = 'span',
        variant = 'body',
        children,
        align,
        color,
        cursor,
        size,
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
        css={{
          textAlign: align,
          fontSize: size,
          color,
          cursor,
          outline,
          userSelect,
        }}
        ref={ref}
      >
        {children}
      </Box>
    )
  );
