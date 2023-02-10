import React, { ReactNode } from 'react';

import { HtmlProps } from '@marigold/types';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface CenterProps extends HtmlProps<'div'> {
  children?: ReactNode;
  maxWidth?: string;
  space?: ResponsiveStyleValue<string>;
}

export const Center = ({
  maxWidth,
  space = 'none',
  children,
  ...props
}: CenterProps) => (
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
