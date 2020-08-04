import React from 'react';
import { Box, system } from '@marigold/system';

type ContainerProps = {};

export const Container = system<ContainerProps, 'div'>(
  ({ variant = 'container', children, ...props }) => {
    return (
      <Box
        as="div"
        themeSection="layout"
        variant={variant}
        css={{ width: '100%' }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
