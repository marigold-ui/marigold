import React, { ReactNode } from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface BreakoutProps extends ComponentProps<'div'> {
  children?: ReactNode;
  alignY?: 'top' | 'bottom' | 'center';
  alignX?: 'left' | 'right' | 'center';
  height?: string;
}

const useAlignment = (direction?: string) => {
  switch (direction) {
    case 'right':
      return 'flex-end';
    case 'bottom':
      return 'flex-end';
    case 'center':
      return 'center';
  }
  return 'flex-start';
};

export const Breakout = ({
  alignX,
  alignY,
  height,
  children,
  ...props
}: BreakoutProps) => {
  const alignItems = useAlignment(alignY);
  const justifyContent = useAlignment(alignX);

  return (
    <Box
      alignItems={alignItems}
      justifyContent={justifyContent}
      width="100%"
      height={height}
      display={alignY || alignX ? 'flex' : 'block'}
      __baseCSS={{
        gridColumn: '1 / -1 !important',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
