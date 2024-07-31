import { ReactNode } from 'react';

import type { WidthProp } from '@marigold/system';
import { cn, createVar, width as twWidth } from '@marigold/system';

export interface ScrollableProps extends WidthProp {
  /**
   * Children of the layout.
   */
  children?: ReactNode;
  /**
   * Specifies the height of the scrollable container.
   */
  height?: string;
}
export const Scrollable = ({
  children,
  width = 'full',
  height,
  ...props
}: ScrollableProps) => (
  <div
    {...props}
    className={cn(['sticky h-[--height] overflow-auto', twWidth[width]])}
    style={createVar({ height })}
  >
    {children}
  </div>
);
