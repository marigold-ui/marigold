import React from 'react';
import { system, Box } from '@marigold/system';

type LabelProps = {
  htmlFor: string;
};

export const Label = system<LabelProps, 'label'>(
  ({ variant = 'label', htmlFor, children, ...props }) => {
    return (
      <Box
        as="label"
        themeSection="form"
        variant={variant}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
