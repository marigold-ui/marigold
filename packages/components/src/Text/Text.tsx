import React, { forwardRef } from 'react';
import { ResponsiveStyleValue, useStyles } from '@marigold/system';
import { ComponentWithAs } from '@marigold/types';
import { Box, BoxProps } from '../Box';

export type TextProps = {
  align?: ResponsiveStyleValue<string>;
  color?: ResponsiveStyleValue<string>;
  cursor?: ResponsiveStyleValue<string>;
  outline?: ResponsiveStyleValue<string>;
  userSelect?: ResponsiveStyleValue<string>;
} & BoxProps;

export const Text: ComponentWithAs<TextProps, 'span'> = forwardRef(
  (
    {
      children,
      className,
      as = 'span',
      variant = 'body',
      align,
      color,
      cursor,
      outline,
      userSelect,
      ...props
    },
    ref
  ) => {
    const cn = useStyles({
      className,
      variant: `text.${variant}`,
      css: { textAlign: align, color, cursor, outline, userSelect },
    });

    return (
      <Box {...props} as={as} className={cn} ref={ref}>
        {children}
      </Box>
    );
  }
);
