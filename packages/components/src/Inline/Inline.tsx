import { ReactNode } from 'react';
import { GapSpaceProp, alignment, cn, gapSpace } from '@marigold/system';

// Props
// ---------------
export interface InlineProps extends GapSpaceProp {
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
  ...props
}: InlineProps) => (
  <div
    {...props}
    className={cn(
      'flex flex-wrap',
      gapSpace[space],
      alignX && alignment?.horizontal?.alignmentX[alignX],
      alignY && alignment?.horizontal?.alignmentY[alignY]
    )}
  >
    {children}
  </div>
);
