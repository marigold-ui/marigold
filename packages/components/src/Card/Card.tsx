import { ReactNode } from 'react';

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
  extends Omit<HtmlProps<'div'>, 'className'>,
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

  /**
   * Padding of the component.
   */
  p?: PaddingSpaceProp['space'];

  /**
   * Padding horizontal (left and right) of the component.
   */
  px?: PaddingSpacePropX['spaceX'];

  /**
   * Padding vertical (top and bottom) of the component.
   */
  py?: PaddingSpacePropY['spaceY'];
}

// Component
// ---------------
export const Card = ({
  children,
  variant,
  size,
  space = 0,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  ...props
}: CardProps) => {
  const classNames = useClassNames({ component: 'Card', variant, size });
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col',
        classNames,
        gapSpace[space],
        paddingSpace !== undefined && paddingSpace[p!],
        paddingSpaceX !== undefined && paddingSpaceX[px!],
        paddingSpaceY !== undefined && paddingSpaceY[py!],
        paddingRight !== undefined && paddingRight[pr!],
        paddingLeft !== undefined && paddingLeft[pl!],
        paddingBottom !== undefined && paddingBottom[pb!],
        paddingTop !== undefined && paddingTop[pt!]
      )}
    >
      {children}
    </div>
  );
};
