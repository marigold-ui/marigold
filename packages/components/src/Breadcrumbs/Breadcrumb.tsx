import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Breadcrumb as RACBreadcrumb } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';

export interface BreadcrumbProps
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

const _Breadcrumb = forwardRef<HTMLLIElement, BreadcrumbProps>(
  ({ variant, size, children, href, ...props }, ref) => {
    const classNames = useClassNames({
      component: 'Breadcrumbs',
      variant,
      size,
    });

    return (
      <RACBreadcrumb
        {...props}
        ref={ref}
        className={({ isCurrent, isDisabled }) =>
          cn(
            classNames.item,
            isCurrent && classNames.current,
            isDisabled && 'text-disabled cursor-not-allowed'
          )
        }
      >
        {children}
      </RACBreadcrumb>
    );
  }
);

export { _Breadcrumb as Breadcrumb };
