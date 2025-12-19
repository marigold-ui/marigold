import type RAC from 'react-aria-components';
import { Table } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { TableViewContext } from './Context';
import { TableViewBody } from './TableViewBody';
import { TableViewCell } from './TableViewCell';
import { TableViewColumn } from './TableViewColumn';
import { TableViewHeader } from './TableViewHeader';
import { TableViewRow } from './TableViewRow';

// Remove props that we want to customize
type RemovedProps = 'className' | 'style';

export interface TableViewProps extends Omit<RAC.TableProps, RemovedProps> {
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  size?: string;
}

function BaseTableView({ variant, size, ...props }: TableViewProps) {
  const classNames = useClassNames({
    component: 'Table',
    variant,
    size,
  });

  return (
    <TableViewContext.Provider value={{ classNames, variant, size }}>
      <Table className={cn('group/table', classNames.table)} {...props} />
    </TableViewContext.Provider>
  );
}

const TableView = Object.assign(BaseTableView, {
  Header: TableViewHeader,
  Column: TableViewColumn,
  Body: TableViewBody,
  Row: TableViewRow,
  Cell: TableViewCell,
});

export { TableView };

// Export types
export type { TableViewHeaderProps } from './TableViewHeader';
export type { TableViewColumnProps } from './TableViewColumn';
export type { TableViewBodyProps } from './TableViewBody';
export type { TableViewRowProps } from './TableViewRow';
export type { TableViewCellProps } from './TableViewCell';
