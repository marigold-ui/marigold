import { type ReactNode, use, useEffect, useRef } from 'react';
import { TableStateContext } from 'react-aria-components/Table';
import { cn, textAlign } from '@marigold/system';
import { useTableContext } from './Context';

// Helpers
// ---------------
/**
 * Prevents event propagation for table cells, to make their content
 * selectable without interfering with row selection.
 */
const stopPropagationProps = {
  onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
  onPointerDown: (e: React.PointerEvent) => e.stopPropagation(),
  onTouchStart: (e: React.TouchEvent) => e.stopPropagation(),
};

// Props
// ---------------
export interface TableCellContentProps {
  columnIndex?: number | null;
  /**
   * Horizontal text alignment of the cell content.
   */
  alignX?: keyof typeof textAlign;
  /**
   * Text overflow behavior for this specific cell. Overrides the table-level overflow setting.
   */
  cellOverflow?: 'truncate' | 'wrap';
  /**
   * The content of the cell.
   */
  children: ReactNode;
  /**
   * Optional additional classes to apply to the content wrapper.
   */
  className?: string;
  /**
   * Whether text selection is allowed. Overrides the table-level `allowTextSelection` setting.
   */
  allowTextSelection?: boolean;
  /**
   * Whether the cell resolved no `textValue`. Only `Table.Cell` sets this, and
   * only to drive the development warning below.
   */
  missingTextValue?: boolean;
}

// Component
// ---------------
export const TableCellContent = ({
  columnIndex,
  alignX,
  cellOverflow,
  children,
  className,
  allowTextSelection,
  missingTextValue,
}: TableCellContentProps) => {
  const {
    overflow: tableOverflow,
    allowTextSelection: tableAllowTextSelection,
  } = useTableContext();
  const state = use(TableStateContext);

  // Cell-level overrides table-level
  const overflow = cellOverflow ?? tableOverflow;

  // Cell-level overrides table-level
  const selectable = allowTextSelection ?? tableAllowTextSelection;

  const columnAlign =
    columnIndex != null
      ? (state?.collection.columns[columnIndex].props
          .alignX as keyof typeof textAlign)
      : undefined;

  // Only a row header names its row, so composite content in any other column
  // is fine and has to stay silent.
  const column =
    columnIndex != null ? state?.collection.columns[columnIndex] : undefined;
  const isRowHeader =
    column != null && state != null
      ? state.collection.rowHeaderColumnKeys.has(column.key)
      : false;

  const warnedRef = useRef(false);
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    if (!missingTextValue || !isRowHeader || warnedRef.current) return;

    warnedRef.current = true;
    // React Aria raises this for `GridListItem`, `ListBoxItem`, `Tag` and
    // `TreeItem`, and for nothing in a table, which is why unnamed rows go
    // unnoticed.
    console.warn(
      'A `textValue` prop is required for <Table.Cell> elements in a `rowHeader` column whose children are not plain text, in order to support accessibility features such as type to select.'
    );
  }, [missingTextValue, isRowHeader]);

  return (
    <div
      data-cell-content=""
      className={cn(
        textAlign[alignX || columnAlign || 'left'],
        overflow === 'truncate' ? 'truncate' : 'wrap-break-word',
        selectable && 'cursor-text select-text',
        className
      )}
      tabIndex={selectable ? -1 : undefined}
      {...(selectable ? stopPropagationProps : {})}
    >
      {children}
    </div>
  );
};
