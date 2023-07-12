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
export interface StackProps
  extends Pick<AlignmentProp['orientation']['vertical'], 'alignX' | ' alignY'>,
    GapSpaceProp {
  children?: ReactNode;
  stretch?: boolean;
}

// alignX -> bottom, center, top
// alignY -> right,left, center

// Component
// ---------------
export const Stack = ({
  children,
  space = 0,
  stretch = false,
  alignX,
  alignY,
  ...props
}: StackProps) => {
  console.log(alignmentX[alignX], alignX);
  return (
    <div
      className={cn(
        'flex flex-col',
        gapSpace[space],
        alignY && alignmentX[alignX],
        alignX && alignmentY[alignY],
        // orientation?.verticalalignmentX[orientation?.vertical?.alignY],
        // alignmentY[orientation?.vertical?.alignX],
        stretch && 'h-full w-full'
      )}
      {...props}
    >
      {children}
    </div>
  );
};
