import { ReactNode } from 'react';
import type RAC from 'react-aria-components';

type RemovedProps = 'className' | 'style';

export interface BreadcrumbsItemProps extends Omit<
  RAC.BreadcrumbProps,
  RemovedProps
> {
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: 'default' | (string & {});
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
  size?: 'small' | 'default' | 'large' | (string & {});

  /**
   * The content inside the breadcrumb.
   */
  children: ReactNode;

  /**
   * Link for the breadcrumb item.
   */
  href: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BreadcrumbsItem = (_: BreadcrumbsItemProps) => null;
