import React, { forwardRef } from 'react';
import { ResponsiveStyleValue, useStyles } from '@marigold/system';
import {
  PolymorphicComponentWithRef,
  PolymorphicPropsWithRef,
} from '@marigold/types';

import { Box, BoxOwnProps } from '../Box';

export type TextOwnProps = {
  align?: ResponsiveStyleValue<string>;
  color?: ResponsiveStyleValue<string>;
  cursor?: ResponsiveStyleValue<string>;
  outline?: ResponsiveStyleValue<string>;
  userSelect?: ResponsiveStyleValue<string>;
} & BoxOwnProps;

export type TextProps = PolymorphicPropsWithRef<TextOwnProps, 'span'>;

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
