import { ReactNode } from 'react';
import { useTableRowGroup } from '@react-aria/table';

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
  return (
    <thead
      {...rowGroupProps}
      className={stickyHeader ? '[&_th]:sticky [&_th]:top-0' : ''}
    >
      {children}
    </thead>
  );
};
