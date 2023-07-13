import React, { ReactNode } from 'react';
import {
  gapSpace,
  // alignmentX,
  // alignmentY,
  // AlignmentXProp,
  // AlignmentYProp,#
  AlignmentProp,
  GapSpaceProp,
  cn,
} from '@marigold/system';

// Props
// ---------------
export interface InlineProps extends AlignmentProp, GapSpaceProp {
  children?: ReactNode;
}

// Component
// ---------------
export const Inline = ({
  space = 0,
  // alignX = 'left',
  // alignY = 'center',
  children,
  ...props
}: InlineProps) => (
  <div
    className={cn(
      'flex flex-wrap',
      gapSpace[space]
      // alignmentX[alignX],
      // alignmentY[alignY]
    )}
    {...props}
  >
    {children}
  </div>
);
