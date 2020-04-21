import React, { Profiler } from 'react';
import { Box, system, onRenderCallback } from '@marigold/system';

type TextProps = {};

export const Text = system<TextProps, 'span'>(
  ({ as = 'span', variant, children, ...props }) => {
    return (
      <Profiler id="text" onRender={onRenderCallback}>
        <Box as={as} themeSection="text" variant={variant} {...props}>
          {children}
        </Box>
      </Profiler>
    );
  }
);
