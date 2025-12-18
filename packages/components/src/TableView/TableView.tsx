import type RAC from 'react-aria-components';
import { Table } from 'react-aria-components';
import { TableViewBody } from './TableViewBody';
import { TableViewCell } from './TableViewCell';
import { TableViewColumn } from './TableViewColumn';
import { TableViewHeader } from './TableViewHeader';
import { TableViewRow } from './TableViewRow';

// Remove props that we want to customize
type RemovedProps = 'className' | 'style';

// TODO: Add variant and size props when implementing styling
// variant?: 'default' | 'bordered' | 'striped' | (string & {});
// size?: 'small' | 'medium' | 'large' | (string & {});
export type TableViewProps = Omit<RAC.TableProps, RemovedProps>;

const _TableView = (props: TableViewProps) => {
  return <Table {...props} />;
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
