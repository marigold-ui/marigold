import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { alignment, cn } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { useTopNavigationContext } from './Context';

export interface TopNavigationMiddleProps {
  /**
   * Accessible label for the navigation landmark.
   * @default 'Global navigation'
   */
  'aria-label'?: string;
  /**
   * Horizontal alignment of the items inside the middle slot.
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;
  /**
   * Vertical alignment of the items inside the middle slot.
   * @default 'center'
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const TopNavigationMiddle = forwardRef(
  (
    {
      'aria-label': ariaLabel,
      alignX,
      alignY = 'center',
      children,
      ...props
    }: TopNavigationMiddleProps,
    ref: Ref<HTMLElement>
  ) => {
    const { classNames } = useTopNavigationContext();
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel ?? stringFormatter.format('globalNavigation')}
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
