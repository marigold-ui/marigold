import { ReactNode, forwardRef, isValidElement } from 'react';
import type RAC from 'react-aria-components';
import { Breadcrumbs as RACBreadcrumbs } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ChevronRight } from '../icons';
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';

type RemovedProps = 'isDisabled' | 'className' | 'style';

export interface BreadcrumbsProps
  extends Omit<RAC.BreadcrumbsProps, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * Disables the breadcrumb navigation
   */
  disabled?: RAC.BreadcrumbsProps['isDisabled'];

  /**
   * Breadcrumb items
   */
  children: ReactNode;

  /**
   * Max number of visible items
   * @default 3
   */
  maxVisibleItems?: number;
}

const _Breadcrumbs = forwardRef<HTMLOListElement, BreadcrumbsProps>(
  (
    { children, variant, size, disabled, maxVisibleItems = 3, ...props },
    ref
  ) => {
    const classNames = useClassNames({
      component: 'Breadcrumbs',
      variant,
      size,
    });

    const items = Array.isArray(children) ? children : [children];
    const total = items.length;

    // Collapse if too many
    const shouldCollapse = total > maxVisibleItems;
    const first = items[0];
    const last = items[total - 1];
    const collapsed = shouldCollapse
      ? [first, <BreadcrumbEllipsis key="ellipsis" />, last]
      : items;

    return (
      <nav aria-label="Breadcrumbs">
        <RACBreadcrumbs
          {...props}
          ref={ref}
          isDisabled={disabled}
          className={cn('flex items-center gap-2', classNames.container)}
        >
          {collapsed.map((item, index) => (
            <li key={index}>
              {item}
              {index < collapsed.length - 1 && (
                <span className={classNames.separator} aria-hidden="true">
                  <ChevronRight />
                </span>
              )}
            </li>
          ))}
        </RACBreadcrumbs>
      </nav>
    );
  }
);

export { _Breadcrumbs as Breadcrumbs };
