import { ReactNode } from 'react';
import { alignment, cn, gapSpace } from '@marigold/system';
import type { GapSpaceProp } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

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
  alignY?: keyof typeof alignment.horizontal.alignmentY | 'inputBaseline';
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
      alignY === 'inputBaseline' &&
        'items-end [&:has([slot=description])]:items-end [&:has([slot=description])_button]:mb-6 [&:has([slot=errorMessage])]:mb-6',
      alignY &&
        alignY !== 'inputBaseline' &&
        alignment?.horizontal?.alignmentY[alignY]
    )}
  >
    {children}
  </div>
);
