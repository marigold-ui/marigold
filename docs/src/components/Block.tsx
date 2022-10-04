import type { ReactNode } from 'react';
import { Box } from '@marigold/system';

export interface BlockProps {
  children: ReactNode;
  height?: number | string;
}

export const Block = ({ children, height }: BlockProps) => (
  <Box
    css={{
      height,
      background: 'hsla(218 16% 77% / 50%)',
      border: '1px solid hsla(218 16% 70% / 50%)',
      borderRadius: 12,
      p: 12,
    }}
  >
    {children}
  </Box>
);
