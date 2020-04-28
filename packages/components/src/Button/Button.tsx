import React from 'react';
import { Box, system } from '@marigold/system';

type ButtonProps = {
  disabled?: boolean;
};

export const Button = system<ButtonProps, 'button'>(
  ({ variant = 'primary.large', disabled, children, ...props }) => {
    return (
      <Box
        {...props}
        as="button"
        themeSection="button"
        variant={variant}
        disabled={disabled}
      >
        {children}
      </Box>
    );
  }
);
