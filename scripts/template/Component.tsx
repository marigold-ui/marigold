import React from 'react';
import { Box, system } from '@marigold/system';

type Props = {};

export const COMP = system<Props, 'div'>(({ variant, children, ...props }) => {
  return (
    <Box as="div" themeSection="" variant={variant} {...props}>
      {children}
    </Box>
  );
});
