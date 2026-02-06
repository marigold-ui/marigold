import { type ReactNode, useContext } from 'react';
import { TableStateContext } from 'react-aria-components';
import { cn, textAlign, verticalAlign } from '@marigold/system';
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
  align?: keyof typeof textAlign;
  /**
   * Text overflow behavior for this specific cell. Overrides the table-level overflow setting.
   */
  cellOverflow?: 'truncate' | 'wrap';
  /**
   * Vertical alignment of cell content. Overrides the table-level verticalAlign setting.
   */
  cellVerticalAlign?: keyof typeof verticalAlign;
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
}

// Component
// ---------------
export const TableCellContent = ({
  columnIndex,
  align,
  cellOverflow,
  cellVerticalAlign,
  children,
  className,
  allowTextSelection,
}: TableCellContentProps) => {
  const {
    overflow: tableOverflow,
    allowTextSelection: tableAllowTextSelection,
    verticalAlign: tableVerticalAlign = 'middle',
  } = useTableContext();
  const state = useContext(TableStateContext);

  // Cell-level overrides table-level
  const overflow = cellOverflow ?? tableOverflow;
  const vAlign = cellVerticalAlign ?? tableVerticalAlign;

  // Cell-level overrides table-level
  const selectable = allowTextSelection ?? tableAllowTextSelection;

  // Get align prop from column
  const columnAlign = columnIndex
    ? (state?.collection.columns[columnIndex].props
        .align as keyof typeof textAlign)
    : undefined;

  return (
    <div
      data-cell-content=""
      className={cn(
        textAlign[align || columnAlign || 'left'],
        verticalAlign[vAlign],
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
