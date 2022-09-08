import type { ReactNode } from 'react';
import { Box } from '@marigold/system';

import { border, fill } from './styles';

export interface RectangleProps {
  height?: string;
  children?: ReactNode;
}

export const Rectangle = ({ children, height }: RectangleProps) => (
  <Box
    css={{
      height: height || 'medium-1',
      width: '100%',
      background: `linear-gradient(135deg, ${fill.light}, ${fill.dark}) 0 0 / 100% `,
      ...border,
    }}
  >
    {children}
  </Box>
);
