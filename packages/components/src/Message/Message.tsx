import React from 'react';
import { Box, system } from '@marigold/system';

type MessageProps = {};

export const Message = system<MessageProps, 'div'>(
  ({ variant = 'messages', children, ...props }) => {
    return (
      <Box as="div" themeSection="content" variant={variant} {...props}>
        {children}
      </Box>
    );
  }
);
