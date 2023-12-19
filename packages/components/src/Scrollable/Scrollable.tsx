import { ReactNode } from 'react';

import { WidthProp, cn, createVar, width as twWidth } from '@marigold/system';

export interface ScrollableProps extends WidthProp {
  children?: ReactNode;
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
    className={cn('flex h-[--height] overflow-x-auto', twWidth[width])}
    style={createVar({ height })}
  >
    {children}
  </div>
);
