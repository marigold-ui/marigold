import React, { ReactNode } from 'react';
import {
  cn,
  gapSpace,
  alignmentX,
  alignmentY,
  AlignmentXProp,
  AlignmentYProp,
  GapSpaceProp,
} from '@marigold/system';

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
  space = 0,
  alignX = 'none',
  alignY = 'none',
  stretch = false,
  ...props
}: StackProps) => (
  <div
    className={cn(
      'flex flex-col',
      gapSpace[space],
      alignmentX[alignX],
      alignmentY[alignY],
      stretch && 'h-full w-full'
    )}
    {...props}
  >
    {children}
  </div>
);
