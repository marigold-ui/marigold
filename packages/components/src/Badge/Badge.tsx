import React from 'react';
import { Box, system } from '@marigold/system';

type BadgeProps = {
  borderColor?: string;
  backgroundColor?: string;
};

export const Badge = system<BadgeProps, 'div'>(
  ({
    variant = 'badge',
    borderColor = 'inherit',
    backgroundColor = 'inherit',
    children,
    ...props
  }) => {
    return (
      <Box
        as="div"
        themeSection="content"
        variant={variant}
        {...props}
        css={{ border: '1px solid ' + borderColor, bg: backgroundColor }}
      >
        {children}
      </Box>
    );
  }
);
