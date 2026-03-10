import {
  Children,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
  isValidElement,
  useCallback,
  useRef,
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

    const NULL_REF = { current: null };
    const items = Children.toArray(children);
    const total = items.length;

    const internalRef = useRef<HTMLOListElement>(null);

    const autoMax = useAutoCollapse(
      maxVisibleItems === 'auto' ? internalRef : NULL_REF,
      total
    );

    const effectiveMax = maxVisibleItems === 'auto' ? autoMax : maxVisibleItems;

    const shouldCollapse =
      typeof effectiveMax === 'number' &&
      effectiveMax >= 2 &&
      total > effectiveMax;

    // Current (last) item is always visible.
    // When maxVisibleItems=2: [ellipsis, current]
    // When maxVisibleItems>=3: [first, ellipsis, current]
    const hiddenItems = shouldCollapse
      ? effectiveMax === 2
        ? items.slice(0, -1)
        : items.slice(1, -1)
      : [];

    const ellipsis = (
      <BreadcrumbsItem key="ellipsis" href="">
        <BreadcrumbEllipsis hiddenItems={hiddenItems} />
      </BreadcrumbsItem>
    );

    const displayedItems = shouldCollapse
      ? effectiveMax === 2
        ? [ellipsis, items[total - 1]]
        : [items[0], ellipsis, items[total - 1]]
      : items;

    const mergedRef = useCallback(
      (node: HTMLOListElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <RACBreadcrumbs
        {...props}
        ref={mergedRef}
        isDisabled={disabled}
        className={cn(
          container,
          maxVisibleItems === 'auto' && 'whitespace-nowrap'
        )}
      >
        {displayedItems.map((item, index) => {
          if (!isValidElement<BreadcrumbsItemProps>(item)) return null;

          const isLast = index === displayedItems.length - 1;

          const { href, children: itemChildren, ...ariaProps } = item.props;

          return (
            <RACBreadcrumb
              key={`${href}-${index}`}
              {...ariaProps}
              className={breadcrumbsItem}
            >
              {href ? (
                <a
                  href={href}
                  className={cn(link, isLast && current)}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {itemChildren}
                </a>
              ) : (
                itemChildren
              )}

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
