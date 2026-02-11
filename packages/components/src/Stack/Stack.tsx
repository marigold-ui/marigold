import { Children, ReactNode } from 'react';
import type { SpaceProp, SpacingTokens } from '@marigold/system';
import { alignment, cn, createSpacingVar } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

// Props
// ---------------
export interface StackProps extends AriaRegionProps {
  /**
   * Set the spacing between child elements.
   * @remarks `SpacingTokens<Tokens>`
   */
  space?: SpaceProp<SpacingTokens>['space'];
  /**
   * Children of the component.
   */
  children?: ReactNode;

  /**
   * Stretch to fill space (vertical AND horizontal, useful if you want to change y alignment).
   * @default false
   */
  stretch?: boolean;

  /**
   * Horizontal alignment for the children.
   * @default 'stretch'
   */
  alignX?: keyof typeof alignment.vertical.alignmentX;

  /**
   * Vertical alignment for the children.
   */
  alignY?: keyof typeof alignment.vertical.alignmentY;
  /**
   * Prop to make the stack rendered as a list element.
   * Useful for screen readers and accessibility.
   * @default false
   */
  asList?: boolean;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = '0',
  stretch = false,
  alignX = 'stretch',
  alignY,
  asList = false,
  ...props
}: StackProps) => {
  const Component = asList ? 'ul' : 'div';
  const stackChildren = asList
    ? Children.map(children, child => (child != null ? <li>{child}</li> : null))
    : children;

  return (
    <Component
      className={cn(
        'flex flex-col gap-y-(--space)',
        alignX && alignment?.vertical?.alignmentX[alignX],
        alignY && alignment?.vertical?.alignmentY[alignY],
        stretch && 'size-full'
      )}
      style={createSpacingVar('space', `${space}`)}
      {...props}
    >
      {stackChildren}
    </Component>
  );
};
