import { ReactNode } from 'react';
import type { WidthProp } from '@marigold/system';
import { cn, createVar, createWidthVar } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export interface ScrollableProps extends AriaRegionProps {
  /**
   * Set the width of the container.
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
    // Says this is a scroll area on both axes with a height of its own. CSS
    // computes `overflow-x` to `auto` whenever `overflow-y` is not `visible`,
    // so a child cannot tell that from a vertical-only scroller by style.
    data-scrollable
    className={cn(
      'sticky h-(--height) w-(--width) overflow-auto overscroll-auto'
    )}
    style={{
      ...createVar({ height }),
      ...createWidthVar('width', width),
    }}
  >
    {children}
  </div>
);
