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
export interface CardProps {
  children?: ReactNode;
  variant?: string;
  size?: string;

  /**
   * Stretch to fill space horizontally.
   * @default false
   */
  stretch?: boolean;

  /**
   * Set the spacing between child elements. You can see allowed tokens [here](../../foundations/design-token#spacing).
   * @remarks `SpaceProp<SpacingTokens>`
   */
  space?: SpaceProp<SpacingTokens>['space'];

  /**
   * Padding of the component. You can see allowed tokens [here](../../foundations/design-token#spacing).
   * @remarks `PaddingSpaceProp`
   */
  p?: PaddingSpaceProp['space'];

  /**
   * Padding horizontal (left and right) of the component.
   *  @remarks `PaddingSpacePropX`
   */
  px?: PaddingSpacePropX['spaceX'];

  /**
   * Padding vertical (top and bottom) of the component. You can see allowed tokens [here](../../foundations/design-token#spacing).
   * @remarks `PaddingSpacePropY`
   */
  py?: PaddingSpacePropY['spaceY'];

  /**
   * Set the right padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   * @remarks `PaddingRightProp`
   */
  pr?: PaddingRightProp['pr'];

  /**
   * Set the left padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   * @remarks `PaddingLeftProp`
   */
  pl?: PaddingLeftProp['pl'];

  /**
   * Set the top padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   * @remarks `PaddingTopProp`
   */
  pt?: PaddingTopProp['pt'];

  /**
   * Set the bottom padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   * @remarks `PaddingBottomProp`
   */
  pb?: PaddingBottomProp['pb'];
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
        'flex flex-col gap-y-(--space)',
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
