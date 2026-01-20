import { ReactNode } from 'react';
import type RAC from 'react-aria-components';

type RemovedProps = 'className' | 'style';

export interface BreadcrumbsItemProps extends Omit<
  RAC.BreadcrumbProps,
  RemovedProps
> {
  variant?: 'default' | (string & {});
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
