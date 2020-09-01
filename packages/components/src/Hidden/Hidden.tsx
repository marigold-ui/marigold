import React from 'react';
import { Box, system } from '@marigold/system';

type HiddenProps = {
  show?: boolean;
};

export const Hidden = system<HiddenProps, 'span'>(
  ({ variant = 'hidden', show = false, children, ...props }) => {
    return (
      <Box
        as="span"
        css={show ? { display: 'display' } : { display: 'none' }}
        themeSection="layout"
        variant={variant}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
