import React from 'react';
import { Box, system } from '@marigold/system';

type AlertProps = {};
// danger, info, warning, success

export const Alert = system<AlertProps, 'div'>(
  ({ variant = 'info', ref, children, ...props }) => {
    return (
      <Box
        as="div"
        ref={ref}
        themeSection="alerts"
        variant={variant}
        {...props}
        css={{
          display: 'flex',
          alignItems: 'center',
          px: 3,
          py: 2,
          borderRadius: 4,
        }}
      >
        {children}
      </Box>
    );
  }
);
