import {
  Children,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
  isValidElement,
  useRef,
} from 'react';
import {
  Link,
  Breadcrumb as RACBreadcrumb,
  Breadcrumbs as RACBreadcrumbs,
  BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import { useObjectRef } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { ChevronRight } from '../icons/ChevronRight';
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';
import { BreadcrumbsItem, BreadcrumbsItemProps } from './BreadcrumbsItem';
import { HiddenBreadcrumbs } from './HiddenBreadcrumbs';
import { useAutoCollapse } from './useAutoCollapse';

type RemovedProps = 'className' | 'style' | 'children' | 'isDisabled';

export interface BreadcrumbsProps extends Omit<
  RACBreadcrumbsProps<object>,
  RemovedProps
> {
  variant?: 'default' | (string & {});
  size?: 'small' | 'default' | 'large' | (string & {});

  /**
   * Disables the breadcrumbs.
   * @default false
   */
  disabled?: RACBreadcrumbsProps<object>['isDisabled'];

  /**
   * Maximum number of visible items before the breadcrumbs collapse.
   * Set to `'auto'` to automatically collapse based on available space.
   * @default 'auto'
   */
  maxVisibleItems?: number | 'auto';

  /**
   * The breadcrumb items to be displayed.
   */
  children: ReactNode | ReactNode[];
}

export interface BreadcrumbsComponent extends ForwardRefExoticComponent<
  BreadcrumbsProps & RefAttributes<HTMLOListElement>
> {
  Item: typeof BreadcrumbsItem;
}

const _Breadcrumbs = forwardRef<HTMLOListElement, BreadcrumbsProps>(
  (
    { children, variant, size, disabled, maxVisibleItems = 'auto', ...props },
    ref
  ) => {
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

    const items = Children.toArray(children);
    const total = items.length;

    const objRef = useObjectRef(ref);
    const hiddenRef = useRef<HTMLDivElement>(null);

    const autoMax = useAutoCollapse(objRef, hiddenRef, total);

    const effectiveMax = maxVisibleItems === 'auto' ? autoMax : maxVisibleItems;

    const shouldCollapse =
      typeof effectiveMax === 'number' &&
      effectiveMax >= 2 &&
      total > effectiveMax;

    // When collapsed, show: [first, ellipsis, ...trailing, current]
    // effectiveMax=2: [ellipsis, current] (no first item)
    // effectiveMax=3: [first, ellipsis, current]
    // effectiveMax=4: [first, ellipsis, item(n-1), current]
    const sliceIndex = shouldCollapse
      ? effectiveMax === 2
        ? total - 1
        : total - (effectiveMax - 2)
      : 0;

    const hiddenItems = shouldCollapse
      ? effectiveMax === 2
        ? items.slice(0, -1)
        : items.slice(1, sliceIndex)
      : [];

    const displayedItems = shouldCollapse
      ? effectiveMax === 2
        ? [null, ...items.slice(sliceIndex)]
        : [items[0], null, ...items.slice(sliceIndex)]
      : items;

    const breadcrumbs = (
      <RACBreadcrumbs
        {...props}
        ref={objRef}
        isDisabled={disabled}
        className={cn(
          container,
          maxVisibleItems === 'auto' &&
            'flex-nowrap overflow-hidden whitespace-nowrap'
        )}
      >
        {displayedItems.map((item, index) => {
          if (item === null) {
            return (
              <RACBreadcrumb key="ellipsis" className={breadcrumbsItem}>
                <BreadcrumbEllipsis hiddenItems={hiddenItems} />
                <ChevronRight
                  aria-hidden="true"
                  size={16}
                  data-testid="breadcrumb-chevronright"
                />
              </RACBreadcrumb>
            );
          }

          if (!isValidElement<BreadcrumbsItemProps>(item)) return null;

          const { href, children: itemChildren, ...ariaProps } = item.props;

          return (
            <RACBreadcrumb
              key={`${href}-${index}`}
              {...ariaProps}
              className={breadcrumbsItem}
            >
              {({ isCurrent }) => (
                <>
                  <Link href={href} className={cn(link, isCurrent && current)}>
                    {itemChildren}
                  </Link>
                  {!isCurrent && (
                    <ChevronRight
                      aria-hidden="true"
                      size={16}
                      data-testid="breadcrumb-chevronright"
                    />
                  )}
                </>
              )}
            </RACBreadcrumb>
          );
        })}
      </RACBreadcrumbs>
    );

    if (maxVisibleItems !== 'auto') {
      return breadcrumbs;
    }

    return (
      <HiddenBreadcrumbs
        items={items}
        itemClassName={breadcrumbsItem}
        hiddenRef={hiddenRef}
      >
        {breadcrumbs}
      </HiddenBreadcrumbs>
    );
  }
) as BreadcrumbsComponent;

_Breadcrumbs.Item = BreadcrumbsItem;

export { _Breadcrumbs as Breadcrumbs };
