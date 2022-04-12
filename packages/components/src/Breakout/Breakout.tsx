import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface BreakoutProps extends ComponentProps<'div'> {
  horizontalAlign?: 'top' | 'bottom' | 'center';
  verticalAlign?: 'left' | 'right' | 'center';
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

export const Breakout: React.FC<BreakoutProps> = ({
  horizontalAlign,
  verticalAlign,
  children,
  ...props
}) => {
  const alignItems = useAlignment(horizontalAlign);
  const justifyContent = useAlignment(verticalAlign);
  return (
    <Box
      alignItems={alignItems}
      justifyContent={justifyContent}
      width="100%"
      display={verticalAlign || horizontalAlign ? 'flex' : 'block'}
      css={{
        gridColumn: '1 / -1',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
