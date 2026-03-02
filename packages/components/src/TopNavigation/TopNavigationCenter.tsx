import type { ReactNode } from 'react';
import { alignment, cn, useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationCenterProps {
  /**
   * Horizontal alignment of the items inside the center slot.
   * @default 'left'
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  /**
   * Vertical alignment of the items inside the center slot.
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
  children?: ReactNode;
}

export const TopNavigationCenter = ({
  alignX,
  alignY = 'center',
  children,
}: TopNavigationCenterProps) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    context: TopNavigationContext,
  });

  return (
    <div
      className={cn(
        classNames.center,
        alignX && alignment.horizontal.alignmentX[alignX],
        alignY && alignment.horizontal.alignmentY[alignY]
      )}
      style={{ gridArea: 'center' }}
    >
      {children}
    </div>
  );
};
