import React from 'react';
import { Box, system } from '@marigold/system';

type InputProps = {};

export const Input = system<InputProps, 'input'>(
  ({ variant = 'input', type = 'text', children, ...props }) => {
    return (
      <Box
        as="input"
        type={type}
        themeSection="form"
        variant={variant}
        {...props}
        css={{
          border: 0,
        }}
      />
    );
  }
);
