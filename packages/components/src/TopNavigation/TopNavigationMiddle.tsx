import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { alignment, cn, useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationMiddleProps {
  /**
   * Accessible label for the navigation landmark.
   */
  'aria-label'?: string;
  /**
   * Horizontal alignment of the items inside the middle slot.
   * @default 'left'
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  /**
   * Vertical alignment of the items inside the middle slot.
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const TopNavigationMiddle = forwardRef(
  (
    { alignX, alignY = 'center', children, ...props }: TopNavigationMiddleProps,
    ref: Ref<HTMLElement>
  ) => {
    const classNames = useClassNames({
      component: 'TopNavigation',
      context: TopNavigationContext,
    });

    return (
      <nav
        ref={ref}
        {...props}
        className={cn(
          'min-w-0 [grid-area:middle]',
          classNames.middle,
          alignX && alignment.horizontal.alignmentX[alignX],
          alignY && alignment.horizontal.alignmentY[alignY]
        )}
      >
        {children}
      </nav>
    );
  }
);
