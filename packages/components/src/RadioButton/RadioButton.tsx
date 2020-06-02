import React from 'react';
import { Box, system } from '@marigold/system';

type RadioButtonProps = {};

export const RadioButton = system<RadioButtonProps, 'input'>(
  ({ variant = 'radio', ...props }) => {
    return (
      <Box
        as="input"
        type="radio"
        themeSection="form"
        variant={variant}
        {...props}
      ></Box>
    );
  }
);
