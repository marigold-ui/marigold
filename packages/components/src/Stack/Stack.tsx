import React, { ReactNode } from 'react';
import {
  cn,
  gapSpace,
  alignment,
  AlignmentProps,
  GapSpaceProp,
} from '@marigold/system';

// Props
// ---------------
export interface StackProps
  extends Pick<AlignmentProps['orientation']['vertical'], 'alignX' | 'alignY'>,
    GapSpaceProp {
  children?: ReactNode;
  stretch?: boolean;
}

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
