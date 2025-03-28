import { ReactNode } from 'react';
import { useTableRowGroup } from '@react-aria/table';
import { cn } from '@marigold/system';
import { useTableContext } from './Context';

export interface TableHeaderProps {
  /**
   * Children of the component.
   */
  children: ReactNode;
  /**
   * Makes the header stick to the viewport.
   */
  stickyHeader?: boolean;
}

export const TableHeader = ({ stickyHeader, children }: TableHeaderProps) => {
  const { rowGroupProps } = useTableRowGroup();
  const { classNames } = useTableContext();
  return (
    <thead
      {...rowGroupProps}
      className={cn(
        classNames?.thead,
        // for sticky header &th needs to be sticky for b2b and core theme
        // for rui sticky is applied to thead
        stickyHeader ? 'sticky [&_th]:sticky [&_th]:top-0' : ''
      )}
    >
      {children}
    </thead>
  );
};
