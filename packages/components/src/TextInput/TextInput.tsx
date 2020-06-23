import React from 'react';
import { Box, system } from '@marigold/system';

type TextInputProps = {};

export const TextInput = system<TextInputProps, 'input'>(
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
