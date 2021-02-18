import React from 'react';
import { Box } from '../Box';

type ContainerProps = {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => (
  <Box {...props} width="100%">
    {children}
  </Box>
);
