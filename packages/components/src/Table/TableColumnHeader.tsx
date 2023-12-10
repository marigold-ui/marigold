import { Column } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { SortDown, SortUp } from '@marigold/icons';
import { WidthProp, cn, width as twWidth } from '@marigold/system';

import { useTableContext } from './Context';

type RemovedProps =
  | 'className'
  | 'style'
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'defaultWidth';

export interface TableColumnHeaderProps
  extends Omit<RAC.ColumnProps, RemovedProps>,
    WidthProp {}

const _TableColumnHeader = ({
  width = 'auto',
  ...props
}: TableColumnHeaderProps) => {
  const { classNames } = useTableContext();

  return (
    <Column
      {...props}
      className={cn('cursor-default', twWidth[width], classNames?.header)}
    >
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}
          {allowsSorting && (
            <>
              {sortDirection === 'ascending' ? (
                <SortUp className="inline-block" />
              ) : (
                <SortDown className="inline-block" />
              )}
            </>
          )}
        </>
      )}
    </Column>
  );
};

export { _TableColumnHeader as TableColumnHeader };
