import React, { forwardRef } from 'react';
import type { BreadcrumbsProps as RACBreadcrumbsProps } from 'react-aria-components';
import { Breadcrumbs as RACBreadcrumbs } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ChevronRight } from '../icons';
import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';

export interface BreadcrumbsListProps
  extends Omit<
    RACBreadcrumbsProps<object>,
    'className' | 'style' | 'children'
  > {
  variant?: string;
  size?: string;
  disabled?: RACBreadcrumbsProps<object>['isDisabled'];
  maxVisibleItems?: number;
  separatorType?: 'chevron' | 'slash';
  children: React.ReactNode | React.ReactNode[];
}

const _BreadcrumbsList = forwardRef<HTMLOListElement, BreadcrumbsListProps>(
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

    const items = React.Children.toArray(children);

    const total = items.length;

    const shouldCollapse = total > maxVisibleItems;

    const hiddenItems = shouldCollapse ? items.slice(1, -1) : [];

    const collapsed = shouldCollapse
      ? [
          items[0],
          <Breadcrumb key="ellipsis">
            <BreadcrumbEllipsis hiddenItems={hiddenItems} />
          </Breadcrumb>,
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

            const breadcrumb = item as React.ReactElement<BreadcrumbProps>;

            const href = breadcrumb.props?.href ?? undefined;

            const itemChildren =
              typeof item === 'string' || typeof item === 'number'
                ? item
                : React.isValidElement(item)
                  ? breadcrumb.props?.children
                  : null;

            return (
              <Breadcrumb key={index}>
                <a href={href} className={classNames.link}>
                  {itemChildren}
                </a>

                {!isLast && separatorType === 'chevron' && (
                  <ChevronRight aria-hidden="true" size={14} />
                )}

                {!isLast && separatorType === 'slash' && (
                  <span className="px-1" aria-hidden="true">
                    /
                  </span>
                )}
              </Breadcrumb>
            );
          })}
        </RACBreadcrumbs>
      </nav>
    );
  }
);

const Breadcrumbs = Object.assign(_BreadcrumbsList, {
  List: _BreadcrumbsList,
});

export { Breadcrumbs };
