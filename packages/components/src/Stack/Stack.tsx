import React from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface StackProps {
  as?: 'div' | 'ul' | 'ol';
  space?: ResponsiveStyleValue<string>;
  align?: 'left' | 'right' | 'center';
}

const ALIGNMENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Stack: React.FC<StackProps> = ({
  space = 'none',
  align = 'left',
  children,
  ...props
}) => (
  <Box
    {...props}
    __baseCSS={{ gap: space, p: 0 }}
    display="flex"
    flexDirection="column"
    alignItems={ALIGNMENT[align]}
  >
    {children}
  </Box>
);
