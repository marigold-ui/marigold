import { ReactNode } from 'react';
import { alignment, cn, createSpacingVar } from '@marigold/system';
import type { SpaceProp, SpacingTokens } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

const inlineAlignmentY = {
  ...alignment.horizontal.alignmentY,
  input:
    'items-end [&:has([slot=description])]:items-end [&:has([slot=description])_>*:not(:has([slot=description]))]:mb-6 [&:has([slot=errorMessage])_>*:not(:has([slot=errorMessage]))]:mb-6',
};

// Props
// ---------------
export interface InlineProps extends SpaceProp<SpacingTokens>, AriaRegionProps {
  /**
   * The children of the component.
   */
  children?: ReactNode;
  /**
   * Prevent the items from wrapping to the next line.
   */
  noWrap?: boolean;
  /**
   * Horizontal alignment of the items inside the element.
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  /**
   * Vertical alignment of the items inside the element.
   */
  alignY?: keyof typeof inlineAlignmentY;
}

// Component
// ---------------
export const Inline = ({
  space = 0,
  noWrap,
  alignX,
  alignY,
  children,
  ...props
}: InlineProps) => (
  <div
    {...props}
    className={cn(
      'flex gap-(--space)',
      // flexbox defaults to no-wrap
      !noWrap && 'flex-wrap',
      alignX && alignment?.horizontal?.alignmentX[alignX],
      alignY && inlineAlignmentY[alignY]
    )}
    style={createSpacingVar('space', `${space}`)}
  >
    {children}
  </div>
);
