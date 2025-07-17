import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Breadcrumb as RACBreadcrumb } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

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
   * Optional href to make the breadcrumb an interactive link.
   */
  href?: string;
}

const _BreadcrumbsItem = forwardRef<HTMLLIElement, BreadcrumbsItemProps>(
  ({ variant, size, children, href, ...rest }, ref) => {
    const { item, current } = useClassNames({
      component: 'Breadcrumbs',
      variant,
      size,
    });

    return (
      <RACBreadcrumb
        {...rest}
        ref={ref}
        className={({ isCurrent }) => cn(item, isCurrent && current)}
      >
        {children}
      </RACBreadcrumb>
    );
  }
);

export { _BreadcrumbsItem as BreadcrumbsItem };
