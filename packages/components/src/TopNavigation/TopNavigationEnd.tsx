import type { ReactNode } from 'react';
import { alignment, cn, useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationEndProps {
  /**
   * Accessible label for the navigation landmark.
   */
  'aria-label'?: string;
  /**
   * Horizontal alignment of the items inside the end slot.
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  /**
   * Vertical alignment of the items inside the end slot.
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const TopNavigationEnd = ({
  alignX,
  alignY,
  children,
  ...props
}: TopNavigationEndProps) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    context: TopNavigationContext,
  });

  return (
    <nav
      {...props}
      className={cn(
        'min-w-0 [grid-area:end]',
        classNames.end,
        alignX && alignment.horizontal.alignmentX[alignX],
        alignY && alignment.horizontal.alignmentY[alignY]
      )}
    >
      {children}
    </nav>
  );
};
