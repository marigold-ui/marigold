import React from 'react';
import { Box, system } from '@marigold/system';

type TextProps = {
  textColor?: string;
};

export const Text = system<TextProps, 'span'>(
  ({
    as = 'span',
    variant = 'body',
    textColor = 'inherit',
    children,
    ...props
  }) => {
    return (
      <Box
        {...props}
        as={as}
        themeSection="text"
        variant={variant}
        css={{ color: textColor }}
      >
        {children}
      </Box>
    );
  }
);
