import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style' | 'children';

export interface TableViewCellProps extends Omit<RAC.CellProps, RemovedProps> {
  children?: ReactNode;
}

const TableViewCell = ({ children, ...props }: TableViewCellProps) => {
  const { classNames } = useTableViewContext();
  return (
    <Cell className={cn(classNames?.cell)} {...props}>
      {children}
    </Cell>
  );
};

export { TableViewCell };
