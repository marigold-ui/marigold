import React from 'react';
import { Box, system } from '@marigold/system';

type ButtonProps = {};

export const Button = system<ButtonProps, 'button'>(
  ({ variant = 'primary.large', children, ...props }) => {
    return (
      <Box as="button" themeSection="button" variant={variant} {...props}>
        {children}
      </Box>
    );
  }
);
