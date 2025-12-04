import { ReactNode } from 'react';
import type {
  PaddingBottomProp,
  PaddingLeftProp,
  PaddingRightProp,
  PaddingSpaceProp,
  PaddingSpacePropX,
  PaddingSpacePropY,
  PaddingTopProp,
  SpaceProp,
  SpacingTokens,
} from '@marigold/system';
import {
  cn,
  createSpacingVar,
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
  extends SpaceProp<SpacingTokens>,
    PaddingRightProp,
    PaddingLeftProp,
    PaddingBottomProp,
    PaddingTopProp {
  children?: ReactNode;
  variant?: string;
  size?: string;

  /**
   * Stretch to fill space horizontally.
   * @default false
   */
  stretch?: boolean;

  /**
   * Padding of the component. You can see allowed tokens [here](../../foundations/design-token#spacing).
   */
  p?: PaddingSpaceProp['space'];

  /**
   * Padding horizontal (left and right) of the component.
   */
  px?: PaddingSpacePropX['spaceX'];

  /**
   * Padding vertical (top and bottom) of the component. You can see allowed tokens [here](../../foundations/design-token#spacing).
   */
  py?: PaddingSpacePropY['spaceY'];
}

// Component
// ---------------
export const Card = ({
  children,
  variant,
  size,
  space = '0',
  stretch,
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
        'flex flex-col items-start gap-y-(--space)',
        stretch ? '' : 'w-fit',
        classNames,
        paddingSpace !== undefined && paddingSpace[p!],
        paddingSpaceX !== undefined && paddingSpaceX[px!],
        paddingSpaceY !== undefined && paddingSpaceY[py!],
        paddingRight !== undefined && paddingRight[pr!],
        paddingLeft !== undefined && paddingLeft[pl!],
        paddingBottom !== undefined && paddingBottom[pb!],
        paddingTop !== undefined && paddingTop[pt!]
      )}
      style={createSpacingVar('space', `${space}`)}
    >
      {children}
    </div>
  );
};
