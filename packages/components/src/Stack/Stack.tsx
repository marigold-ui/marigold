import React, { ReactNode } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface StackProps {
  as?: 'div' | 'ul' | 'ol';
  space?: ResponsiveStyleValue<string>;
  align?: 'left' | 'right' | 'center';
  children?: ReactNode;
}

const ALIGNMENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Stack = ({
  space = 'none',
  align = 'left',
  children,
  ...props
}: StackProps) => (
  <Box
    {...props}
    display="flex"
    flexDirection="column"
    alignItems={ALIGNMENT[align]}
    p="0"
    css={{ gap: space }}
  >
    {children}
  </Box>
);
