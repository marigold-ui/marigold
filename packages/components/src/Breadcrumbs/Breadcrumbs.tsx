import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from 'react';
import type { BreadcrumbsProps as RACBreadcrumbsProps } from 'react-aria-components';
import { Breadcrumbs as RACBreadcrumbs } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ChevronRight } from '../icons';
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';
import { BreadcrumbsItem, BreadcrumbsItemProps } from './BreadcrumbsItem';

type RemovedProps = 'className' | 'style' | 'children' | 'isDisabled';

export interface BreadcrumbsProps
  extends Omit<RACBreadcrumbsProps<object>, RemovedProps> {
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
   */
  separatorType?: 'chevron' | 'slash';

  /**
   * The breadcrumb items to be displayed.
   */
  children: React.ReactNode | React.ReactNode[];
}

export interface BreadcrumbsComponent
  extends ForwardRefExoticComponent<
    BreadcrumbsProps & RefAttributes<HTMLOListElement>
  > {
  Item: typeof BreadcrumbsItem;
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

    const items = React.Children.toArray(children);

    const total = items.length;

    const shouldCollapse = total > maxVisibleItems;

    const hiddenItems = shouldCollapse ? items.slice(1, -1) : [];

    const collapsed = shouldCollapse
      ? [
          items[0],
          <BreadcrumbsItem key="ellipsis">
            <BreadcrumbEllipsis hiddenItems={hiddenItems} />
          </BreadcrumbsItem>,
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

            const breadcrumb = item as React.ReactElement<BreadcrumbsItemProps>;

            const href = breadcrumb.props?.href ?? undefined;

            const itemChildren =
              typeof item === 'string' || typeof item === 'number'
                ? item
                : React.isValidElement(item)
                  ? breadcrumb.props?.children
                  : null;

            return (
              <BreadcrumbsItem key={index}>
                {href ? (
                  <a href={href} className={classNames.link}>
                    {itemChildren}
                  </a>
                ) : (
                  itemChildren
                )}

                {!isLast && separatorType === 'chevron' && (
                  <ChevronRight aria-hidden="true" size={14} />
                )}

                {!isLast && separatorType === 'slash' && (
                  <span className="px-1" aria-hidden="true">
                    /
                  </span>
                )}
              </BreadcrumbsItem>
            );
          })}
        </RACBreadcrumbs>
      </nav>
    );
  }
) as BreadcrumbsComponent;

_Breadcrumbs.Item = BreadcrumbsItem;

export { _Breadcrumbs as Breadcrumbs };
