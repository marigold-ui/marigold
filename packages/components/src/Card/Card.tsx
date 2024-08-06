import { ReactNode } from 'react';
import type {
  GapSpaceProp,
  PaddingBottomProp,
  PaddingLeftProp,
  PaddingRightProp,
  PaddingSpaceProp,
  PaddingSpacePropX,
  PaddingSpacePropY,
  PaddingTopProp,
} from '@marigold/system';
import {
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

// Props
// ---------------
export interface CardProps
  extends GapSpaceProp,
    PaddingSpaceProp,
    PaddingRightProp,
    PaddingLeftProp,
    PaddingBottomProp,
    PaddingTopProp {
  children?: ReactNode;
  variant?: string;
  size?: string;

  /**
   * Padding of the component. You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).
   */
  p?: PaddingSpaceProp['space'];

  /**
   * Padding horizontal (left and right) of the component.
   */
  px?: PaddingSpacePropX['spaceX'];

  /**
   * Padding vertical (top and bottom) of the component. You can see allowed tokens [here](../../introduction/design-tokens?theme=core#spacing).
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
