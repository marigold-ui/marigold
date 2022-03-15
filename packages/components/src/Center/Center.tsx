import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface CenterProps extends ComponentProps<'div'> {}

export const Center: React.FC<CenterProps> = ({ children, ...props }) => (
  <Box {...props} width="100%">
    {children}
  </Box>
);
