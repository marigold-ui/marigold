/* v8 ignore start */
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
  children: ReactNode;

  /**
   * Link for the breadcrumb item.
   */
  href: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BreadcrumbsItem(_: BreadcrumbsItemProps): null {
  return null;
}
/* v8 ignore stop */
