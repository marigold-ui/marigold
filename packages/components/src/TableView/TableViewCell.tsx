import type { ReactNode } from 'react';
import { useContext } from 'react';
import type RAC from 'react-aria-components';
import { Cell, TableStateContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style' | 'children';

export interface TableViewCellProps extends Omit<RAC.CellProps, RemovedProps> {
  children?: ReactNode;
}

const Inner = ({
  columnId,
  children,
}: {
  columnId?: RAC.Key;
  children?: ReactNode;
}) => {
  const ctx = useContext(TableStateContext);

  console.log(
    columnId,
    ctx?.collection.columns,
    ctx?.collection.columns.find(col => col.key === columnId)
  );

  return <span>{children}</span>;
};

const TableViewCell = ({ children, ...props }: TableViewCellProps) => {
  const { classNames } = useTableViewContext();
  return (
    <Cell className={cn(classNames?.cell)} {...props}>
      {({ id }) => <Inner columnId={id}>{children}</Inner>}
    </Cell>
  );
};

export { TableViewCell };
