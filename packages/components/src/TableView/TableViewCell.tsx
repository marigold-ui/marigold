import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell, useTableOptions } from 'react-aria-components';
import { cn, textAlign } from '@marigold/system';
import { useTableViewContext } from './Context';
import { TableViewSelectableCell } from './TableViewSelectableCell';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children';

export interface TableViewCellProps extends Omit<RAC.CellProps, RemovedProps> {
  /**
   * The content of the cell.
   */
  children?: ReactNode;
  /**
   * Horizontal text alignment of the cell content.
   * @default 'left'
   */
  align?: keyof typeof textAlign;
}

// Component
// ---------------
const TableViewCell = ({
  children,
  align = 'left',
  ...props
}: TableViewCellProps) => {
  const {
    classNames,
    overflow = 'wrap',
    allowTextSelection = false,
  } = useTableViewContext();
  const { selectionMode } = useTableOptions();

  return (
    <Cell
      className={cn(
        classNames.cell,
        textAlign[align],
        overflow === 'truncate' ? 'max-w-0 truncate' : 'wrap-break-word'
      )}
      {...props}
    >
      {allowTextSelection && selectionMode !== 'none' ? (
        <TableViewSelectableCell>{children}</TableViewSelectableCell>
      ) : (
        children
      )}
    </Cell>
  );
};

export { TableViewCell };
