import React, { ReactNode } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';
const ALIGNMENT_X = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const ALIGNMENT_Y = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

// Props
// ---------------
export interface StackProps {
  as?: 'div' | 'ul' | 'ol';
  children?: ReactNode;
  space?: ResponsiveStyleValue<string>;
  alignX?: keyof typeof ALIGNMENT_X;
  alignY?: keyof typeof ALIGNMENT_Y;
  stretch?: boolean;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = 'none',
  alignX = 'left',
  alignY = 'top',
  stretch = false,
  ...props
}: StackProps) => (
  <Box
    css={{
      display: 'flex',
      flexDirection: 'column',
      p: 0,
      gap: space,
      alignItems: ALIGNMENT_X[alignX],
      justifyContent: ALIGNMENT_Y[alignY],
      blockSize: stretch ? '100%' : 'auto',
    }}
    {...props}
  >
    {children}
  </Box>
);
