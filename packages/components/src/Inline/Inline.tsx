import React from 'react';
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
export interface InlineProps {
  space?: ResponsiveStyleValue<string>;
  alignX?: keyof typeof ALIGNMENT_X;
  alignY?: keyof typeof ALIGNMENT_Y;
}

// Component
// ---------------
export const Inline: React.FC<InlineProps> = ({
  space = 'none',
  alignX = 'left',
  alignY = 'center',
  children,
  ...props
}) => (
  <Box
    css={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: space,
      alignItems: ALIGNMENT_Y[alignY],
      justifyContent: ALIGNMENT_X[alignX],
    }}
    {...props}
  >
    {children}
  </Box>
);
