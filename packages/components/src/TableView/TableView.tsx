import { useMemo } from 'react';
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
type RemovedProps = 'className' | 'style' | 'selectionBehavior';

export interface TableViewProps extends Omit<RAC.TableProps, RemovedProps> {
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  size?: string;
}

const _TableView = ({ variant, size, ...props }: TableViewProps) => {
  const classNames = useClassNames({
    component: 'TableView',
    variant,
    size,
  });

  const ctx = useMemo(
    () => ({ classNames, variant, size }),
    [classNames, variant, size]
  );

  return (
    <TableViewContext.Provider value={ctx}>
      <Table
        className={cn('group/table', classNames.table)}
        selectionBehavior="toggle"
        {...props}
      />
    </TableViewContext.Provider>
  );
};

const TableView = Object.assign(_TableView, {
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
