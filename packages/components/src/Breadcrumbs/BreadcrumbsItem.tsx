import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Breadcrumb as RACBreadcrumb } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'isDisabled' | 'className' | 'style';

export interface BreadcrumbItemProps extends Omit<RAC.LinkProps, RemovedProps> {
  variant?: string;
  size?: string;

  children: ReactNode;
}

const _BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
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
