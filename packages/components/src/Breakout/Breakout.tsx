import { ReactNode } from 'react';

import { AlignmentProp, alignment, cn, createVar } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

export interface BreakoutProps
  extends Omit<HtmlProps<'div'>, 'className'>,
    AlignmentProp {
  children?: ReactNode;

  /**
   * Set the height of the breakout element.
   */
  height?: string;

  /**
   * Horizontal alignment of the items inside the breakout element.
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;

  /**
   * Vertical alignment of the items inside the breakout element.
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
}

export const Breakout = ({
  height,
  children,
  alignX = 'left',
  alignY = 'center',
  ...props
}: BreakoutProps) => {
  return (
    <div
      className={cn(
        'col-start-[1_!important] col-end-[-1_!important] w-full',
        alignX && alignment?.horizontal?.alignmentX[alignX],
        alignY && alignment?.horizontal?.alignmentY[alignY],
        alignX || alignY ? 'flex' : 'block',
        'h-[--height]'
      )}
      style={createVar({ height })}
      {...props}
    >
      {children}
    </div>
  );
};
