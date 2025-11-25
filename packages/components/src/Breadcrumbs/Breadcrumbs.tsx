import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from 'react';
import {
  Breadcrumb as RACBreadcrumb,
  Breadcrumbs as RACBreadcrumbs,
  BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ChevronRight } from '../icons/ChevronRight';
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';
import { BreadcrumbsItem, BreadcrumbsItemProps } from './BreadcrumbsItem';

type RemovedProps = 'className' | 'style' | 'children' | 'isDisabled';

export interface BreadcrumbsProps
  extends Omit<RACBreadcrumbsProps<object>, RemovedProps> {
  variant?: 'default' | (string & {});
  size?: 'small' | 'default' | 'large' | (string & {});

  /**
   * Disables the breadcrumbs.
   * @default false
   */
  disabled?: RACBreadcrumbsProps<object>['isDisabled'];

  /**
   * Maximum number of visible items before the breadcrumbs collapse.
   */
  maxVisibleItems?: number;

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
  ({ children, variant, size, disabled, maxVisibleItems, ...props }, ref) => {
    const {
      container,
      item: breadcrumbsItem,
      link,
      current,
    } = useClassNames({
      component: 'Breadcrumbs',
      variant,
      size,
    });

    const items = React.Children.toArray(children);
    const total = items.length;

    const shouldCollapse =
      typeof maxVisibleItems === 'number' &&
      maxVisibleItems >= 2 &&
      total > maxVisibleItems;

    const hiddenItems = shouldCollapse ? items.slice(1, -1) : [];

    const ellipsis = (
      <BreadcrumbsItem key="ellipsis" href="">
        <BreadcrumbEllipsis hiddenItems={hiddenItems} />
      </BreadcrumbsItem>
    );

    const displayedItems = shouldCollapse
      ? maxVisibleItems === 2
        ? [items[0], ellipsis]
        : [items[0], ellipsis, items[total - 1]]
      : items;

    return (
      <RACBreadcrumbs
        {...props}
        ref={ref}
        isDisabled={disabled}
        className={container}
      >
        {displayedItems.map((item, index) => {
          if (!React.isValidElement<BreadcrumbsItemProps>(item)) return null;

          const isLast = index === displayedItems.length - 1;

          const { href, children: itemChildren, ...ariaProps } = item.props;

          return (
            <RACBreadcrumb
              key={`${href}-${index}`}
              {...ariaProps}
              className={breadcrumbsItem}
            >
              <a
                href={href}
                className={cn(link, isLast && current)}
                aria-current={isLast ? 'page' : undefined}
              >
                {itemChildren}
              </a>

              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  size={16}
                  data-testid="breadcrumb-chevronright"
                />
              )}
            </RACBreadcrumb>
          );
        })}
      </RACBreadcrumbs>
    );
  }
) as BreadcrumbsComponent;

_Breadcrumbs.Item = BreadcrumbsItem;

export { _Breadcrumbs as Breadcrumbs };
