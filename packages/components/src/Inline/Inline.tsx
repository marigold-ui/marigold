import { ReactNode } from 'react';
import { alignment, cn, gapSpace } from '@marigold/system';
import type { GapSpaceProp } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

const inlineAlignmentY = {
  ...alignment.horizontal.alignmentY,
  input:
    'items-end [&:has([slot=description])]:items-end [&:has([slot=description])_>*:not(:has([slot=description]))]:mb-6 [&:has([slot=errorMessage])_>*:not(:has([slot=errorMessage]))]:mb-6',
};

// Props
// ---------------
export interface InlineProps extends GapSpaceProp, AriaRegionProps {
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
      'flex',
      !noWrap && 'flex-wrap', // flexbox defaults to no-wrap
      gapSpace[space],
      alignX && alignment?.horizontal?.alignmentX[alignX],
      alignY && inlineAlignmentY[alignY]
    )}
  >
    {children}
  </div>
);
