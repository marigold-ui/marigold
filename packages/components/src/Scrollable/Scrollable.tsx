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
    className={cn(
      'sticky h-(--height) w-(--width) overflow-auto overscroll-auto'
    )}
    style={{
      ...createVar({ height }),
      ...createWidthVar('width', `${width}`),
    }}
  >
    {children}
  </div>
);
