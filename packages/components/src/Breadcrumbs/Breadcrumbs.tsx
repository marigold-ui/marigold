import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from 'react';
import {
  Link,
  Breadcrumbs as RACBreadcrumbs,
  BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
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
      ...rest
    },
    ref
  ) => {
    const { container, link } = useClassNames({
      component: 'Breadcrumbs',
      variant,
      size,
    });

    const items = React.Children.toArray(children);

    const total = items.length;

    const shouldCollapse = total > maxVisibleItems;

    const hiddenItems = shouldCollapse ? items.slice(1, -1) : [];

    const displayedItems = shouldCollapse
      ? [
          items[0],
          <BreadcrumbsItem key="ellipsis">
            <BreadcrumbEllipsis hiddenItems={hiddenItems} disabled={disabled} />
          </BreadcrumbsItem>,
          items[total - 1],
        ]
      : items;

    return (
      <nav aria-label="Breadcrumbs">
        <RACBreadcrumbs
          {...rest}
          ref={ref}
          isDisabled={disabled}
          className={cn(container)}
        >
          {displayedItems.map((item, index) => {
            const isLast = index === displayedItems.length - 1;

            if (!React.isValidElement(item) || item.type !== BreadcrumbsItem)
              return null;

            const { href, children: itemChildren } = (
              item as React.ReactElement<BreadcrumbsItemProps>
            ).props;

            return (
              <BreadcrumbsItem key={index}>
                {!isLast && href ? (
                  <Link href={href} className={link}>
                    {itemChildren}
                  </Link>
                ) : (
                  itemChildren
                )}

                {!isLast && separatorType === 'chevron' && (
                  <ChevronRight
                    data-testid="breadcrumb-chevronright"
                    aria-hidden="true"
                    size={14}
                  />
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
