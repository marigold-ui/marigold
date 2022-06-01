/**
 * Based on https://theme-ui.com/components/aspect-ratio
 */
import React, { ReactNode } from 'react';

import { aspect } from '@marigold/tokens';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface AspectProps extends ComponentProps<'div'> {
  children?: ReactNode;
  ratio?: keyof typeof aspect;
  maxWidth?: string;
}

export const Aspect = ({
  ratio = 'square',
  maxWidth,
  children,
}: AspectProps) => (
  <Box
    css={{
      aspectRatio: aspect[ratio],
      overflow: 'hidden',
      maxWidth,
    }}
  >
    {children}
  </Box>
);
