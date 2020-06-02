import React from 'react';
import { Box, system } from '@marigold/system';

type SvgProps = {
  size?: number;
};

export const Svg = system<SvgProps, 'svg'>(
  ({ size = 24, fill = 'currentcolor', children, ...props }) => {
    return (
      <Box
        as="svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        themeSection="icon"
        variant="icon"
        {...props}
      >
        {children}
      </Box>
    );
  }
);
