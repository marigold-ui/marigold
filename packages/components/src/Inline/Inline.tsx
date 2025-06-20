import { ReactNode } from 'react';
import { alignment, cn, gapSpace } from '@marigold/system';
import type { GapSpaceProp } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

// Props
// ---------------
export interface InlineProps extends GapSpaceProp, AriaRegionProps {
  /**
   * Automatically adjusts vertical alignment when input fields display helper text or error messages
   */
  dynamicAlign?: boolean;
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
  alignY?: keyof typeof alignment.horizontal.alignmentY;
}

// Component
// ---------------
export const Inline = ({
  space = 0,
  alignX,
  alignY,
  children,
  dynamicAlign,
  ...props
}: InlineProps) => (
  <div
    {...props}
    className={cn(
      // 'flex flex-wrap',
      gapSpace[space],
      alignX && alignment?.horizontal?.alignmentX[alignX],
      dynamicAlign
        ? 'items-end [&:has([slot=description])]:items-center [&:has([slot=errorMessage])]:items-center'
        : alignY && alignment?.horizontal?.alignmentY[alignY]
    )}
  >
    {children}
  </div>
);
