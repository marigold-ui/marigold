import React from 'react';
import { Box, system } from '@marigold/system';
import { Text } from '@marigold/components';

type LinkProps = {};

export const Link = system<LinkProps, 'a'>(
  ({ variant = 'normal', children, ...props }) => {
    return (
      <Text>
        <Box as="a" themeSection="link" variant={variant} {...props}>
          {children}
        </Box>
      </Text>
    );
  }
);
