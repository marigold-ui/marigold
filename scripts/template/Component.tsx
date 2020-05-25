import React from 'react';
import { Box, system } from '@marigold/system';

type COMPProps = {};

export const COMP = system<COMPProps, 'div'>(
  ({ variant, children, ...props }) => {
    return (
      <Box as="div" themeSection="" variant={variant} {...props}>
        {children}
      </Box>
    );
  }
);
