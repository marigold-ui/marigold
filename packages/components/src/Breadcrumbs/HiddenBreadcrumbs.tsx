import type { ReactNode, RefObject } from 'react';
import { isValidElement } from 'react';
import { cn } from '@marigold/system';
import { ChevronRight } from '../icons/ChevronRight';
import type { BreadcrumbsItemProps } from './BreadcrumbsItem';

interface HiddenBreadcrumbsProps {
  items: ReactNode[];
  itemClassName: string;
  hiddenRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

export const HiddenBreadcrumbs = ({
  items,
  itemClassName,
  hiddenRef,
  children,
}: HiddenBreadcrumbsProps) => (
  <div className="relative">
    <div
      inert
      ref={hiddenRef}
      className="invisible absolute inset-0 flex gap-[inherit] overflow-hidden"
    >
      {items.map((item, idx) => {
        if (!isValidElement<BreadcrumbsItemProps>(item)) return null;
        const { children: itemChildren } = item.props;
        return (
          <div
            data-hidden-breadcrumb
            key={idx}
            className={cn('shrink-0', itemClassName)}
          >
            <span>{itemChildren}</span>
            {idx < items.length - 1 && (
              <ChevronRight aria-hidden="true" size={16} />
            )}
          </div>
        );
      })}
      <div data-hidden-ellipsis className={cn('shrink-0', itemClassName)}>
        <span>...</span>
        <ChevronRight aria-hidden="true" size={16} />
      </div>
    </div>
    {children}
  </div>
);
