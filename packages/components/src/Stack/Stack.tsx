import React, { ReactNode } from 'react';
import { Box } from '@marigold/system';
import { theme, useSpace } from '../layoutTokens';

// works with safelist
const ALIGNMENT_X = {
  none: 'initial',
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
};

const ALIGNMENT_Y = {
  none: 'initial',
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end',
};

// Props
// ---------------
export interface StackProps {
  children?: ReactNode;
  space?: keyof typeof theme.extend.space | undefined;
  alignX?: keyof typeof ALIGNMENT_X;
  alignY?: keyof typeof ALIGNMENT_Y;
  stretch?: boolean;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = 'small',
  alignX = 'none',
  alignY = 'none',
  stretch = false,
  ...props
}: StackProps) => {
  const spaceclass = useSpace(space);
  return (
    <Box
      className={`flex flex-col ${ALIGNMENT_X[alignX]} ${ALIGNMENT_Y[alignY]} ${
        stretch && 'h-full w-full'
      } ${spaceclass}`}
      {...props}
    >
      {children}
    </Box>
  );
};
