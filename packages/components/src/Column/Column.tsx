import React from 'react';
import { Box } from '../Box';

type ColumnProps = {
  className?: string;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const Column: React.FC<ColumnProps> = ({
  width = 12,
  children,
  ...props
}) => (
  <Box {...props} width={`${(width / 12) * 100}%`}>
    {children}
  </Box>
);
