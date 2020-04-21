import React, { Profiler } from 'react';
import { Box, onRenderCallback, system } from '@marigold/system';

type ButtonProps = {};

export const Button = system<ButtonProps, 'button'>(
  ({ variant = '', children, ...props }) => {
    return (
      <Profiler id="button" onRender={onRenderCallback}>
        <Box {...props} as="button" themeSection="button" variant={variant}>
          {children}
        </Box>
      </Profiler>
    );
  }
);
