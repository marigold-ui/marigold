import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { alignment, cn } from '@marigold/system';
import { useTopNavigationContext } from './Context';

export interface TopNavigationStartProps {
  /**
   * Vertical alignment of the items inside the start slot.
   * @default 'center'
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const TopNavigationStart = forwardRef(
  (
    { alignY = 'center', children, ...props }: TopNavigationStartProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { classNames } = useTopNavigationContext();

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'min-w-0 [grid-area:start]',
          classNames.start,
          alignY && alignment.horizontal.alignmentY[alignY]
        )}
      >
        {children}
      </div>
    );
  }
);
