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
  /**
   * If true, the table will stretch to fill the full width of its container.
   * @default false
   */
  stretch?: boolean;
  /**
   * Controls how cell content overflows. Works best when columns have defined width props.
   * @default 'wrap'
   */
  overflow?: 'truncate' | 'wrap';
}

const _TableView = ({
  variant,
  size,
  stretch = false,
  overflow = 'wrap',
  ...props
}: TableViewProps) => {
  const classNames = useClassNames({
    component: 'TableView',
    variant,
    size,
  });

  const ctx = useMemo(
    () => ({ classNames, variant, size, overflow }),
    [classNames, variant, size, overflow]
  );

  return (
    <TableViewContext.Provider value={ctx}>
      <Table
        className={cn('group/table', classNames.table, stretch && 'w-full')}
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
