import React from 'react';
import { Box, system } from '@marigold/system';

type ValidationMessageProps = {};

export const ValidationMessage = system<ValidationMessageProps, 'span'>(
  ({ variant = 'negative', children, ...props }) => {
    return (
      <Box
        as="span"
        themeSection="validation"
        variant={variant}
        {...props}
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    );
  }
);
