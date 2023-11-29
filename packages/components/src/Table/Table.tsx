import { Table } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { TableContext } from './Context';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

// Helper
// ---------------

/**
 * Hey Tailwind, please hav these classes ready!
 *
 * [&_th:nth-child(1)]:text-right
 * [&_th:nth-child(2)]:text-right
 * [&_th:nth-child(3)]:text-right
 * [&_th:nth-child(4)]:text-right
 * [&_th:nth-child(5)]:text-right
 * [&_th:nth-child(6)]:text-right
 * [&_th:nth-child(7)]:text-right
 * [&_th:nth-child(8)]:text-right
 * [&_th:nth-child(9)]:text-right
 * [&_th:nth-child(10)]:text-right
 * [&_th:nth-child(11)]:text-right
 * [&_th:nth-child(12)]:text-right
 * [&_th:nth-child(13)]:text-right
 * [&_th:nth-child(14)]:text-right
 * [&_th:nth-child(15)]:text-right
 *
 * [&_td:nth-child(1)]:text-right
 * [&_td:nth-child(2)]:text-right
 * [&_td:nth-child(3)]:text-right
 * [&_td:nth-child(4)]:text-right
 * [&_td:nth-child(5)]:text-right
 * [&_td:nth-child(6)]:text-right
 * [&_td:nth-child(7)]:text-right
 * [&_td:nth-child(8)]:text-right
 * [&_td:nth-child(9)]:text-right
 * [&_td:nth-child(10)]:text-right
 * [&_td:nth-child(11)]:text-right
 * [&_td:nth-child(12)]:text-right
 * [&_td:nth-child(13)]:text-right
 * [&_td:nth-child(14)]:text-right
 * [&_td:nth-child(15)]:text-right
 */

const tableStyles =
  (...classNames: string[]) =>
  ({ state }: RAC.TableRenderProps) => {
    let styles: string[] = [];

    state.collection.columns.forEach(col => {
      if (col.props.align === 'right') {
        styles.push(
          `[&_td:nth-child(${col.colIndex! + 1})]:text-right`,
          `[&_th:nth-child(${col.colIndex! + 1})]:text-right`
        );
      }
    });

    return cn(...classNames, styles);
  };

// Props
// ---------------
type RemovedProps = 'className' | 'style';
export interface TableProps extends Omit<RAC.TableProps, RemovedProps> {
  variant?: string;
  size?: string;
  stretch?: boolean;
}

// Component
// ---------------
const _Table = ({ children, variant, size, stretch, ...props }: TableProps) => {
  const classNames = useClassNames({
    component: 'Table',
    variant,
    size,
  });

  return (
    <TableContext.Provider value={{ classNames, variant, size }}>
      <Table
        {...props}
        // set to all because without data-[disabled] would not be set.
        disabledBehavior="all"
        className={tableStyles(
          'group/table',
          'border-collapse overflow-auto whitespace-nowrap',
          stretch ? 'table w-full' : 'block',
          classNames.table
        )}
      >
        {children}
      </Table>
    </TableContext.Provider>
  );
};

_Table.Header = TableHeader;
_Table.Column = TableColumnHeader;

_Table.Body = TableBody;
_Table.Row = TableRow;
_Table.Cell = TableCell;

export { _Table as Table };
