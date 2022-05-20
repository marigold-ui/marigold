import React from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface InlineProps {
  space?: ResponsiveStyleValue<string>;
  alignY?: 'top' | 'center' | 'bottom';
}

const ALIGNMENT_Y = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export const Inline: React.FC<InlineProps> = ({
  space = 'none',
  alignY = 'center',
  children,
  ...props
}) => (
  <Box
    css={{
      display: 'inline-flex',
      flexWrap: 'wrap',
      gap: space,
      alignItems: ALIGNMENT_Y[alignY],
    }}
    {...props}
  >
    {children}
  </Box>
);
