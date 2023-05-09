import React, { ReactNode } from 'react';
import { Box, cn } from '@marigold/system';
import { theme, useSpace } from '../layoutTokens';
import {
  gapSpace,
  AlignmentXProp,
  AlignmentYProp,
  GapSpaceProp,
} from 'packages/system/src/style-props';

// Props
// ---------------
export interface StackProps
  extends AlignmentXProp,
    AlignmentYProp,
    GapSpaceProp {
  children?: ReactNode;
  stretch?: boolean;
}

// Component
// ---------------
export const Stack = ({
  children,
  alignX,
  alignY,
  space = 0,
  stretch = false,
  ...props
}: StackProps) => {
  // const spaceclass = useSpace(space);

  return (
    <Box
      className={cn(
        'flex flex-col',
        gapSpace[space],
        stretch && 'h-full w-full'
      )}
      {...props}
    >
      {children}
    </Box>
  );
};
