import React from 'react';
import { Box } from '../Box';

export type HiddenProps = {
  show?: boolean;
};

export const Hidden: React.FC<HiddenProps> = ({
  show = false,
  children,
  ...props
}) => (
  <Box {...props} as="span" display={show ? 'display' : 'none'}>
    {children}
  </Box>
);
