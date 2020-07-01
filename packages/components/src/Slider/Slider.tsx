import React from 'react';
import { Box, system } from '@marigold/system';

type SliderProps = {};

export const Slider = system<SliderProps, 'input'>(
  ({ variant = 'slider', ...props }) => {
    return (
      <Box
        as="input"
        type="range"
        themeSection="form"
        variant={variant}
        {...props}
      />
    );
  }
);
