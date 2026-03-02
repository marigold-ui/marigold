import type { ReactNode } from 'react';
import { alignment, cn, useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationStartProps {
  /**
   * Horizontal alignment of the items inside the start slot.
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  /**
   * Vertical alignment of the items inside the start slot.
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const TopNavigationStart = ({
  alignX,
  alignY,
  children,
}: TopNavigationStartProps) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    context: TopNavigationContext,
  });

  return (
    <div
      className={cn(
        classNames.start,
        alignX && alignment.horizontal.alignmentX[alignX],
        alignY && alignment.horizontal.alignmentY[alignY]
      )}
      style={{ gridArea: 'start' }}
    >
      {children}
    </div>
  );
};
