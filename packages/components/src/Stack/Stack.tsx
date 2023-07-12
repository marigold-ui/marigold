import React, { ReactNode } from 'react';
import {
  cn,
  gapSpace,
  alignmentX,
  alignmentY,
  AlignmentProp,
  GapSpaceProp,
} from '@marigold/system';

// Props
// ---------------
export interface StackProps extends AlignmentProp, GapSpaceProp {
  children?: ReactNode;
  stretch?: boolean;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = 0,
  alignY = 'none',
  alignX = 'none',
  stretch = false,
  ...props
}: StackProps) => (
  <div
    className={cn(
      'flex flex-col',
      gapSpace[space],
      alignmentX[alignY],
      alignmentY[alignX],
      stretch && 'h-full w-full'
    )}
    {...props}
  >
    {children}
  </div>
);
