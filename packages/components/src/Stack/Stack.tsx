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
  alignX?: string;
  alignY?: string | undefined;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = 0,
  stretch = false,
  orientation,
  alignX = orientation?.vertical?.alignX,
  alignY = orientation?.vertical?.alignY,
  ...props
}: StackProps) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        gapSpace[space],
        alignX && (alignment?.vertical?.alignmentX as any)[alignX],
        alignY && (alignment?.vertical?.alignmentY as any)[alignY],
        stretch && 'h-full w-full'
      )}
      {...props}
    >
      {children}
    </div>
  );
};
