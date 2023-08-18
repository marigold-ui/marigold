import React, { ReactNode } from 'react';

import {
  AlignmentProp,
  GapSpaceProp,
  alignment,
  cn,
  gapSpace,
} from '@marigold/system';

// Props
// ---------------
export interface InlineProps extends AlignmentProp, GapSpaceProp {
  children?: ReactNode;
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  alignY?: keyof typeof alignment.horizontal.alignmentY;
}

// Component
// ---------------
export const Inline = ({
  space = 0,
  orientation,
  alignX = orientation?.horizontal?.alignX,
  alignY = orientation?.horizontal?.alignY,
  children,
  ...props
}: InlineProps) => (
  <div
    className={cn(
      'flex flex-wrap',
      gapSpace[space],
      alignX && alignment?.horizontal?.alignmentX[alignX],
      alignY && alignment?.horizontal?.alignmentY[alignY]
    )}
    {...props}
  >
    {children}
  </div>
);
