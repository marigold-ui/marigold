import React from 'react';
import { Box, system } from '@marigold/system';

type LinkProps = {};

export const Link = system<LinkProps, 'a'>(
  ({ variant = 'link', children, ...props }) => {
    return (
      <Box as="a" variant={variant} themeSection="link" {...props}>
        {children}
      </Box>
    );
  }
);
