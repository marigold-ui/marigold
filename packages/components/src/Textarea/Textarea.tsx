import React from 'react';
import { Box, system } from '@marigold/system';

type TextareaProps = {};

export const Textarea = system<TextareaProps, 'textarea'>(
  ({ variant = 'textarea', ref, ...props }) => {
    return (
      <Box
        as="textarea"
        themeSection="form"
        variant={variant}
        ref={ref}
        {...props}
      />
    );
  }
);
