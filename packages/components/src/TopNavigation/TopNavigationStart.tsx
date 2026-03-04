import type { ReactNode } from 'react';
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

export const TopNavigationStart = ({
  alignY = 'center',
  children,
}: TopNavigationStartProps) => {
  const { classNames } = useTopNavigationContext();

  return (
    <div
      className={cn(
        'min-w-0 [grid-area:start]',
        classNames.start,
        alignY && alignment.horizontal.alignmentY[alignY]
      )}
    >
      {children}
    </div>
  );
};
