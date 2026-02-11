import { ReactNode } from 'react';
import type { WidthProp } from '@marigold/system';
import { cn, createVar, width as twWidth } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export interface ScrollableProps extends AriaRegionProps {
  /**
   * Set the width of the container.
   * @remarks `WidthProp<Tokens>`
   */
  width?: WidthProp['width'];

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
    className={cn([
      'sticky h-(--height) overflow-auto overscroll-none',
      twWidth[width],
    ])}
    style={createVar({ height })}
  >
    {children}
  </div>
);
