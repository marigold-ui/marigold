import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface ContainerProps extends ComponentProps<'div'> {}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => (
  <Box {...props} width="100%">
    {children}
  </Box>
);
