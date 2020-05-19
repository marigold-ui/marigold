import React from 'react';
import { Box, system } from '@marigold/system';

type TextProps = {};

export const Text = system<TextProps, 'span'>(
  ({ as = 'span', variant = 'body', children, ...props }) => {
    return (
      <Box {...props} as={as} themeSection="text" variant={variant}>
        {children}
      </Box>
    );
  }
);
