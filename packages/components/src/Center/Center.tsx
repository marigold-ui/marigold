import React from 'react';

import { ComponentProps } from '@marigold/types';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface CenterProps extends ComponentProps<'div'> {
  maxWidth?: string;
  space?: ResponsiveStyleValue<string>;
}

export const Center: React.FC<CenterProps> = ({
  maxWidth,
  space = 'none',
  children,
  ...props
}) => (
  <Box
    css={{
      boxSizing: 'content-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginInline: 'auto',
      maxInlineSize: maxWidth,
      gap: space,
    }}
    {...props}
  >
    {children}
  </Box>
);
