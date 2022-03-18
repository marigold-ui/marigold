import React from 'react';

import { ResponsiveStyleValue } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface CenterProps extends ComponentProps<'div'> {
  maxHeight?: string;
  maxWidth?: string;
  textAlign?: 'left' | 'right' | 'center';
  space?: ResponsiveStyleValue<string>;
  superCentered?: boolean;
}

export const Center: React.FC<CenterProps> = ({
  maxHeight,
  maxWidth,
  textAlign = 'center',
  space = 'none',
  superCentered,
  children,
  ...props
}) => (
  <Box
    __baseCSS={
      superCentered
        ? {
            display: 'grid',
            placeItems: 'center',
            height: '100vh',
          }
        : {
            display: 'grid',
            gap: space,
            boxSizing: 'content-box',
            marginInline: 'auto',
            maxInlineSize: maxWidth,
            height: maxHeight,
            textAlign: textAlign,
          }
    }
    {...props}
  >
    {children}
  </Box>
);
