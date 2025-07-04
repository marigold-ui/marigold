import { forwardRef } from 'react';
import type { BreadcrumbsProps as RACBreadcrumbsProps } from 'react-aria-components';
import { Breadcrumbs as RACBreadcrumbs } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ChevronRight } from '../icons';
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';
import { BreadcrumbItem } from './BreadcrumbsItem';

export interface BreadcrumbsProps
  extends Omit<
    RACBreadcrumbsProps<object>,
    'className' | 'style' | 'children'
  > {
  variant?: string;
  size?: string;

  /**
   * Disables the breadcrumbs.
   * @default false
   */
  disabled?: RACBreadcrumbsProps<object>['isDisabled'];

  /**
   * Maximum number of visible items before the breadcrumbs collapse.
   * @default 3
   */
  maxVisibleItems?: number;

  /**
   * Type of separator between breadcrumb items.
   * @default 'chevron'
   * Options: 'chevron' | 'slash'
   */
  separatorType?: 'chevron' | 'slash';

  /**
   * The breadcrumb items to be displayed.
   */
  children?: React.ReactNode[];
}

const _Breadcrumbs = forwardRef<HTMLOListElement, BreadcrumbsProps>(
  (
    {
      children,
      variant,
      size,
      disabled,
      maxVisibleItems = 3,
      separatorType = 'chevron',
      ...props
    },
    ref
  ) => {
    const classNames = useClassNames({
      component: 'Breadcrumbs',
      variant,
      size,
    });

    const items = children || [];
    const total = items.length;

    const shouldCollapse = total > maxVisibleItems;

    const hiddenItems = shouldCollapse ? items.slice(1, -1) : [];

    const collapsed = shouldCollapse
      ? [
          items[0],
          <BreadcrumbItem key="ellipsis">
            <BreadcrumbEllipsis hiddenItems={hiddenItems} />
          </BreadcrumbItem>,
          items[total - 1],
        ]
      : items;

    return (
      <nav aria-label="Breadcrumbs">
        <RACBreadcrumbs
          {...props}
          ref={ref}
          isDisabled={disabled}
          className={cn(classNames.container)}
        >
          {collapsed.map((item, index) => {
            const isLast = index === collapsed.length - 1;
            if (!item || typeof item === 'boolean') return null;
            const itemChildren =
              typeof item === 'string' || typeof item === 'number'
                ? item
                : 'props' in (item as any) && (item as any).props?.children;

            return (
              <BreadcrumbItem key={index}>
                {itemChildren}

                {!isLast && separatorType === 'chevron' && (
                  <span aria-hidden="true" className={classNames.separator}>
                    <ChevronRight />
                  </span>
                )}

                {!isLast && separatorType === 'slash' && (
                  <span aria-hidden="true" className={classNames.separator}>
                    /
                  </span>
                )}
              </BreadcrumbItem>
            );
          })}
        </RACBreadcrumbs>
      </nav>
    );
  }
);

export { _Breadcrumbs as Breadcrumbs };
