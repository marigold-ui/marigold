import React, { ReactNode } from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface BreakoutProps extends ComponentProps<'div'> {
  children?: ReactNode;
  verticalAlign?: 'top' | 'bottom' | 'center';
  horizontalAlign?: 'left' | 'right' | 'center';
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
  horizontalAlign,
  verticalAlign,
  children,
  ...props
}: BreakoutProps) => {
  const alignItems = useAlignment(verticalAlign);
  const justifyContent = useAlignment(horizontalAlign);

  console.log('Vertical align', verticalAlign);
  console.log('Justify', justifyContent);

  console.log('Horiziontal align', verticalAlign);
  console.log('alignItems', alignItems);
  return (
    <Box
      alignItems={alignItems}
      justifyContent={justifyContent}
      width="100%"
      display={verticalAlign || horizontalAlign ? 'flex' : 'block'}
      __baseCSS={{
        gridColumn: '1 / -1 !important',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
