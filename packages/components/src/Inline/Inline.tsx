import { ReactNode } from 'react';
import { alignment, cn, gapSpace } from '@marigold/system';
import type { GapSpaceProp } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

const inlineAlignmentY = {
  ...alignment.horizontal.alignmentY,
  input:
    'items-end [&:has([slot=description])]:items-end [&:has([slot=description])_button]:mb-6 [&:has([slot=errorMessage])]:mb-6',
};

// Props
// ---------------
export interface InlineProps extends GapSpaceProp, AriaRegionProps {
  /**
   * The children of the component.
   */
  children?: ReactNode;
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
  alignX,
  alignY,
  children,
  ...props
}: InlineProps) => (
  <div
    {...props}
    className={cn(
      'flex flex-wrap',
      gapSpace[space],
      alignX && alignment?.horizontal?.alignmentX[alignX],
      alignY && inlineAlignmentY[alignY]
    )}
  >
    {children}
  </div>
);
