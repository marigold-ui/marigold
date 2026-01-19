import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Column, ColumnResizer, Group } from 'react-aria-components';
import { cn, textAlign } from '@marigold/system';
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
  align?: keyof typeof textAlign;
}

const TableViewColumn = ({
  align = 'left',
  ...props
}: TableViewColumnProps) => {
  const { classNames } = useTableViewContext();

  return (
    <Column className={cn(classNames?.header, textAlign[align])} {...props}>
      {({ allowsSorting, sortDirection }) => (
        <div className="TODO">
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
