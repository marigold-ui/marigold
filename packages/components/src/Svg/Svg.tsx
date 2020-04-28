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
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
