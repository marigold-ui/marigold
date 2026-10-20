import type { ReactNode, RefObject } from 'react';
import { isValidElement } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { ChevronRight } from '../icons/ChevronRight';
import type { BreadcrumbsItemProps } from './BreadcrumbsItem';

interface HiddenBreadcrumbsProps {
  items: ReactNode[];
  variant?: string;
  size?: string;
  hiddenRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

export const HiddenBreadcrumbs = ({
  items,
  variant,
  size,
  hiddenRef,
  children,
}: HiddenBreadcrumbsProps) => {
  const {
    container: containerClassName,
    item: itemClassName,
    link: linkClassName,
    current: currentClassName,
  } = useClassNames({ component: 'Breadcrumbs', variant, size });

  return (
    <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)]">
      <div
        inert
        ref={hiddenRef}
        className={cn(
          containerClassName,
          'invisible h-0 flex-nowrap overflow-hidden'
        )}
      >
        {items.map((item, idx) => {
          if (!isValidElement<BreadcrumbsItemProps>(item)) return null;
          const { children: itemChildren } = item.props;
          const isLast = idx === items.length - 1;
          return (
            <div
              data-hidden-breadcrumb
              key={idx}
              className={cn('shrink-0', itemClassName)}
            >
              <span className={cn(linkClassName, isLast && currentClassName)}>
                {itemChildren}
              </span>
              {!isLast && <ChevronRight aria-hidden="true" />}
            </div>
          );
        })}
        <div data-hidden-ellipsis className={cn('shrink-0', itemClassName)}>
          <span>...</span>
          <ChevronRight aria-hidden="true" />
        </div>
      </div>
      {children}
    </div>
  );
};
