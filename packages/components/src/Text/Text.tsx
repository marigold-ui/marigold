import React from 'react';
import { Box, system } from '@marigold/system';

// Define custom properties for your component
type TextProps = {};

export const Text = system<TextProps, 'span'>(
  ({ as = 'span', variant = '', children, ...props }) => {
    return (
      <Box as={as} themeSection="text" variant={variant} {...props}>
        {children}
      </Box>
    );
  }
);
