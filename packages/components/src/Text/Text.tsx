import React from 'react';
import { Box, system } from '@marigold/system';

type TextProps = {};

export const Text = system<TextProps, 'span'>(
  ({ as = 'span', children, ...props }) => {
    return (
      <Box {...props} as={as} themeSection="text" variant={as}>
        {children}
      </Box>
    );
  }
);
