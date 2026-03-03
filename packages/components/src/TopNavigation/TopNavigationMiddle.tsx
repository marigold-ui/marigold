import type { ReactNode } from 'react';
import { alignment, cn, useClassNames } from '@marigold/system';
import { TopNavigationContext } from './Context';

export interface TopNavigationMiddleProps {
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

export const TopNavigationMiddle = ({
  alignX,
  alignY = 'center',
  children,
}: TopNavigationMiddleProps) => {
  const classNames = useClassNames({
    component: 'TopNavigation',
    context: TopNavigationContext,
  });

  return (
    <div
      className={cn(
        'min-w-0',
        classNames.middle,
        alignX && alignment.horizontal.alignmentX[alignX],
        alignY && alignment.horizontal.alignmentY[alignY]
      )}
      style={{ gridArea: 'middle' }}
    >
      {children}
    </div>
  );
};
