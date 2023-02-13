import React, { ReactNode } from 'react';
import { HtmlProps } from '@marigold/types';

import { Box } from '../Box';

export interface BreakoutProps extends HtmlProps<'div'> {
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
      css={{
        alignItems,
        justifyContent,
        height,
        width: '100%',
        display: alignY || alignX ? 'flex' : 'block',
        gridColumn: '1 / -1 !important',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
