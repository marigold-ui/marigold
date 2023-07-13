import React, { ReactNode } from 'react';
import {
  cn,
  gapSpace,
  alignment,
  AlignmentProp,
  GapSpaceProp,
} from '@marigold/system';

// Props
// ---------------
export interface StackProps extends AlignmentProp, GapSpaceProp {
  children?: ReactNode;
  stretch?: boolean;
  alignX?: keyof typeof alignment.vertical.alignmentX;
  alignY?: keyof typeof alignment.vertical.alignmentY;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = 0,
  stretch = false,
  orientation,
  alignX = 'left',
  alignY = 'center',
  ...props
}: StackProps) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        gapSpace[space],
        alignX && alignment?.vertical?.alignmentX[alignX],
        alignY && alignment?.vertical?.alignmentY[alignY],
        stretch && 'h-full w-full'
      )}
      {...props}
    >
      {children}
    </div>
  );
};
