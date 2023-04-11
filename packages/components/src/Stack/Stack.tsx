import React, { ReactNode } from 'react';
import { Box } from '@marigold/system';

import { theme } from 'themes/theme-unicorn/src/spaces';

const space = theme.extend.space;
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
  space?: keyof typeof space;
  alignX?: keyof typeof ALIGNMENT_X;
  alignY?: keyof typeof ALIGNMENT_Y;
  stretch?: boolean;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = 'none',
  alignX = 'none',
  alignY = 'none',
  stretch = false,
  ...props
}: StackProps) => {
  let spaceclass = '';
  if (space === 'xxsmall') {
    spaceclass = 'gap-4';
  } else if (space === 'xsmall') {
    spaceclass = 'gap-8';
  } else if (space === 'small') {
    spaceclass = 'gap-16';
  } else if (space === 'medium') {
    spaceclass = 'gap-24';
  } else if (space === 'large') {
    spaceclass = 'gap-32';
  } else if (space === 'xlarge') {
    spaceclass = 'gap-40';
  } else if (space === 'xxlarge') {
    spaceclass = 'gap-48';
  }

  return (
    <Box
      className={`flex flex-col ${ALIGNMENT_X[alignX]} ${ALIGNMENT_Y[alignY]} ${
        stretch && 'w-full h-full'
      } ${spaceclass}`}
      {...props}
    >
      {children}
    </Box>
  );
};
