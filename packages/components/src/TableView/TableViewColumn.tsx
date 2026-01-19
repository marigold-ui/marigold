import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Column, ColumnResizer, Group } from 'react-aria-components';
import { cn } from '@marigold/system';
import { SortDown } from '../icons/SortDown';
import { SortUp } from '../icons/SortUp';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style' | 'children';

export interface TableViewColumnProps extends Omit<
  RAC.ColumnProps,
  RemovedProps
> {
  children?: ReactNode;
  allowsResizing?: boolean;
}

const TableViewColumn = (props: TableViewColumnProps) => {
  const { classNames } = useTableViewContext();

  return (
    <Column className={cn(classNames?.header)} {...props}>
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
