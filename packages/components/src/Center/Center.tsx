import React from 'react';

import { ComponentProps } from '@marigold/types';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface CenterProps extends ComponentProps<'div'> {
  maxHeight?: ResponsiveStyleValue<string>;
  maxWidth?: ResponsiveStyleValue<string>;
  textAlign?: 'left' | 'right' | 'center';
  superCentered?: boolean;
}

export const Center: React.FC<CenterProps> = ({
  maxHeight,
  maxWidth,
  textAlign = 'center',
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
