import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Column, ColumnResizer, Group } from 'react-aria-components';
import { SortDown } from '../icons/SortDown';
import { SortUp } from '../icons/SortUp';

type RemovedProps = 'className' | 'style' | 'children';

export interface TableViewColumnProps
  extends Omit<RAC.ColumnProps, RemovedProps> {
  children?: ReactNode;
  allowsResizing?: boolean;
}

const TableViewColumn = (props: TableViewColumnProps) => {
  return (
    <Column {...props}>
      {({ allowsSorting, sortDirection }) => (
        <div className="column-header">
          <Group role="presentation" tabIndex={-1}>
            {props.children}
          </Group>
          {allowsSorting && (
            <span aria-hidden="true">
              {sortDirection === 'ascending' ? (
                <SortUp size={16} />
              ) : (
                <SortDown size={16} />
              )}
            </span>
          )}
          {props.allowsResizing && <ColumnResizer />}
        </div>
      )}
    </Column>
  );
};

export { TableViewColumn };
