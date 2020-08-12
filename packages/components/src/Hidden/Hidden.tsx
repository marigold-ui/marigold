import React from 'react';
import { Box, system } from '@marigold/system';

type HiddenProps = {
  show?: false | true;
};

export const Hidden = system<HiddenProps, 'div'>(
  ({ variant = 'hidden', show = false, children, ...props }) => {
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
