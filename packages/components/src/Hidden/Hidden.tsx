import React from 'react';
import { Box, system } from '@marigold/system';

type HiddenProps = {
  show?: false;
};

export const Hidden = system<HiddenProps, 'div'>(
  ({ variant = 'hidden', show, children, ...props }) => {
    return (
      <Box
        as="div"
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
