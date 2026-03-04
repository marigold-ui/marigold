import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { alignment, cn } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { useTopNavigationContext } from './Context';

export interface TopNavigationEndProps {
  /**
   * Accessible label for the navigation landmark.
   * @default 'Utilities'
   */
  'aria-label'?: string;
  /**
   * Vertical alignment of the items inside the end slot.
   * @default 'center'
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const TopNavigationEnd = forwardRef(
  (
    {
      'aria-label': ariaLabel,
      alignY = 'center',
      children,
      ...props
    }: TopNavigationEndProps,
    ref: Ref<HTMLElement>
  ) => {
    const { classNames } = useTopNavigationContext();
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    return (
      <nav
        ref={ref}
        aria-label={
          ariaLabel ?? stringFormatter.format('globalNavigationUtilities')
        }
        {...props}
        className={cn(
          'min-w-0 [grid-area:end]',
          classNames.end,
          alignY && alignment.horizontal.alignmentY[alignY]
        )}
      >
        {children}
      </nav>
    );
  }
);
