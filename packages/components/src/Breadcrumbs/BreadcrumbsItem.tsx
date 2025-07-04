import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Breadcrumb as RACBreadcrumb } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';

export interface BreadcrumbItemProps
  extends Omit<RAC.BreadcrumbProps, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * The content inside the breadcrumb item.
   */
  children?: ReactNode;
}

const _BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ variant, size, children, ...props }, ref) => {
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
            classNames.link,
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

export { _BreadcrumbItem as BreadcrumbItem };
