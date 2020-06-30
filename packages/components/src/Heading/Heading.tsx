import React from 'react';
import { Box, system } from '@marigold/system';

type HeadingProps = {
  headingStyle?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const Heading = system<HeadingProps, 'h2'>(
  ({ headingStyle = 'h2', children, ...props }) => {
    return (
      <Box as="h2" themeSection="text" variant={headingStyle} {...props}>
        {children}
      </Box>
    );
  }
);
