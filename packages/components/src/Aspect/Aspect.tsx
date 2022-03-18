/**
 * Based on https://theme-ui.com/components/aspect-ratio
 */
import React from 'react';

import { aspect } from '@marigold/tokens';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface AspectProps extends ComponentProps<'div'> {
  ratio: keyof typeof aspect;
  maxWidth?: string;
}

export const Aspect: React.FC<AspectProps> = React.forwardRef(
  function AspectRatio(
    { ratio = 'square', maxWidth = '100%', children, ...props },
    ref
  ) {
    return (
      <Box
        ref={ref}
        __baseCSS={{
          position: 'relative',
          overflow: 'hidden',
          maxWidth: maxWidth,
        }}
      >
        <Box
          __baseCSS={{
            aspectRatio: aspect[ratio],
          }}
        />
        <Box
          {...props}
          __baseCSS={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }
);
