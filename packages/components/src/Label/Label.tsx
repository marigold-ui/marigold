import React, { Profiler } from 'react';
import { system, Box, onRenderCallback } from '@marigold/system';

type LabelProps = {
  htmlFor: string;
};

export const Label = system<LabelProps, 'label'>(
  ({ variant = 'label', htmlFor, children, ...props }) => {
    return (
      <Profiler id="label" onRender={onRenderCallback}>
        <Box
          as="label"
          themeSection="form"
          variant={variant}
          htmlFor={htmlFor}
          {...props}
        >
          {children}
        </Box>
      </Profiler>
    );
  }
);
