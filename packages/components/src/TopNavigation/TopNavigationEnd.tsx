import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { alignment, cn } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { useTopNavigationContext } from './Context';

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
  'aria-label': ariaLabel,
  alignX,
  alignY,
  children,
  ...props
}: TopNavigationEndProps) => {
  const { classNames } = useTopNavigationContext();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <nav
      aria-label={ariaLabel ?? stringFormatter.format('globalNavigation')}
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
