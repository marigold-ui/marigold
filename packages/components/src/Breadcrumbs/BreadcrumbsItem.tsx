import { ReactNode } from 'react';
import type RAC from 'react-aria-components';

type RemovedProps = 'className' | 'style';

export interface BreadcrumbsItemProps
  extends Omit<RAC.BreadcrumbProps, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * The content inside the breadcrumb.
   */
  children?: ReactNode;

  /**
   * Link for the breadcrumb item.
   */
  href: string;
}

export function BreadcrumbsItem(_: BreadcrumbsItemProps): null {
  return null;
}
