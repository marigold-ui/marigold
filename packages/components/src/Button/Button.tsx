import React from 'react';
import { Box, system } from '@marigold/system';

type ButtonProps = {
  themeSection?: string;
};

export const Button = system<ButtonProps, 'button'>(
  ({ themeSection = 'button', variant = '', children, ...props }) => {
    return (
      <Box as="button" themeSection={themeSection} variant={variant} {...props}>
        {children}
      </Box>
    );
  }
);
