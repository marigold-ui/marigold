import { ReactNode } from 'react';

import {
  AlignmentProp,
  GapSpaceProp,
  alignment,
  cn,
  gapSpace,
} from '@marigold/system';

// Props
// ---------------
export interface InlineProps extends AlignmentProp, GapSpaceProp {
  children?: ReactNode;
  /**
   * Horizontal alignment of the items inside the breakout element.
   * @default 'left'
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  /**
   * Vertical alignment of the items inside the breakout element.
   * @default 'center'
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
}

// Component
// ---------------
export const Inline = ({
  space = 0,
  orientation,
  alignX = orientation?.horizontal?.alignX,
  alignY = orientation?.horizontal?.alignY,
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
