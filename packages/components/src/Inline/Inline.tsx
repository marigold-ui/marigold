import React from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

const ALIGNMENT_Y = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

const ALIGNMENT_X = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

// Props
// ---------------
export interface InlineProps {
  space?: ResponsiveStyleValue<string>;
  alignY?: keyof typeof ALIGNMENT_Y;
  alignX?: keyof typeof ALIGNMENT_X;
}

// Component
// ---------------
export const Inline: React.FC<InlineProps> = ({
  space = 'none',
  alignY = 'center',
  alignX = 'left',
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
