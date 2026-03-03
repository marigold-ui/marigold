import type { ReactNode } from 'react';
import { alignment, cn } from '@marigold/system';
import { useTopNavigationContext } from './Context';

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
  const { classNames } = useTopNavigationContext();

  return (
    <div
      className={cn(
        'min-w-0 [grid-area:start]',
        classNames.start,
        alignX && alignment.horizontal.alignmentX[alignX],
        alignY && alignment.horizontal.alignmentY[alignY]
      )}
    >
      {children}
    </div>
  );
};
