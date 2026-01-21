import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import { ResizableTableContainer, Table } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { TableViewContext } from './Context';
import { TableViewBody } from './TableViewBody';
import { TableViewCell } from './TableViewCell';
import { TableViewColumn } from './TableViewColumn';
import { TableViewDropIndicator } from './TableViewDropIndicator';
import { TableViewHeader } from './TableViewHeader';
import { TableViewRow } from './TableViewRow';

// Remove props that we want to customize
type RemovedProps = 'className' | 'style' | 'selectionBehavior';

export interface TableViewProps extends Omit<RAC.TableProps, RemovedProps> {
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  size?: string;
  /**
   * Controls how cell content overflows. Works best when columns have defined width props.
   * @default 'wrap'
   */
  overflow?: 'truncate' | 'wrap';
}

const _TableView = ({
  variant,
  size,
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
      <ResizableTableContainer>
        <Table
          className={cn('group/table', classNames.table)}
          selectionBehavior="toggle"
          {...props}
        />
      </ResizableTableContainer>
    </TableViewContext.Provider>
  );
};

const TableView = Object.assign(_TableView, {
  Header: TableViewHeader,
  Column: TableViewColumn,
  Body: TableViewBody,
  Row: TableViewRow,
  Cell: TableViewCell,
  DropIndicator: TableViewDropIndicator,
});

export { TableView };

// Export types
// ---------------
export type { TableViewHeaderProps } from './TableViewHeader';
export type { TableViewColumnProps } from './TableViewColumn';
export type { TableViewBodyProps } from './TableViewBody';
export type { TableViewRowProps } from './TableViewRow';
export type { TableViewCellProps } from './TableViewCell';
export type { TableViewDropIndicatorProps } from './TableViewDropIndicator';
