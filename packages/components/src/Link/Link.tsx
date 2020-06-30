import React from 'react';
import { Box, system } from '@marigold/system';
import { Text } from '@marigold/components';

type LinkProps = {};

export const Link = system<LinkProps, 'a'>(
  ({ variant = 'link', children, ...props }) => {
    return (
      <Text>
        <Box as="a" variant={variant} {...props} themeSection="link">
          {children}
        </Box>
      </Text>
    );
  }
);
