import React, { ReactNode } from 'react';
import { Box, ResponsiveStyleValue } from '@marigold/system';

const ALIGNMENT_X = {
  none: 'initial',
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const ALIGNMENT_Y = {
  none: 'initial',
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

// Props
// ---------------
export interface StackProps {
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
  alignX = 'none',
  alignY = 'none',
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
      blockSize: stretch ? '100%' : 'initial',
    }}
    {...props}
  >
    {children}
  </Box>
);
