import React from 'react';
import { Box } from '../Box';

type WidthValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ColumnProps = {
  className?: string;
  width?: WidthValues | WidthValues[];
};

const transform = (width: WidthValues | WidthValues[]) => {
  if (Array.isArray(width)) {
    return width.map(v => `${(v / 12) * 100}%`);
  }

  return `${(width / 12) * 100}%`;
};

export const Column: React.FC<ColumnProps> = ({
  width = 12,
  children,
  ...props
}) => (
  <Box {...props} width={transform(width)}>
    {children}
  </Box>
);
