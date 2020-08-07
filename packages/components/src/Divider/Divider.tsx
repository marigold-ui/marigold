import React from 'react';
import { Box, system } from '@marigold/system';

type DividerProps = {
  weight?: 'regular' | 'bold';
};

export const Divider = system<DividerProps, 'hr'>(
  ({ variant = 'divider', weight = 'regular', ...props }) => {
    return <Box as="hr" themeSection="divider" variant={weight} {...props} />;
  }
);
