import React, { ReactNode } from 'react';
import {
  GapSpaceProp,
  PaddingBottomProp,
  PaddingLeftProp,
  PaddingRightProp,
  PaddingSpaceProp,
  PaddingSpacePropX,
  PaddingSpacePropY,
  PaddingTopProp,
  cn,
  gapSpace,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingSpace,
  paddingSpaceX,
  paddingSpaceY,
  paddingTop,
  useClassNames,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface CardProps
  extends HtmlProps<'div'>,
    GapSpaceProp,
    PaddingSpaceProp,
    PaddingSpacePropX,
    PaddingSpacePropY,
    PaddingRightProp,
    PaddingLeftProp,
    PaddingBottomProp,
    PaddingTopProp {
  children?: ReactNode;
  variant?: string;
  size?: string;
  p?: PaddingSpaceProp['space'];
  px?: PaddingSpacePropX['spaceX'];
  py?: PaddingSpacePropY['spaceY'];
}

// Component
// ---------------
export const Card = ({
  children,
  variant,
  size,
  space = 0,
  p = 0,
  px = 0,
  py = 0,
  pt = 0,
  pb = 0,
  pl = 0,
  pr = 0,
  ...props
}: CardProps) => {
  const classNames = useClassNames({ component: 'Card', variant, size });
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col',
        gapSpace[space],
        paddingSpace[p],
        paddingSpaceX[px],
        paddingSpaceY[py],
        paddingRight[pr],
        paddingLeft[pl],
        paddingBottom[pb],
        paddingTop[pt],
        classNames
      )}
    >
      {children}
    </div>
  );
};
