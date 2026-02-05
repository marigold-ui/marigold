import type { ReactNode } from 'react';
import { useTableOptions } from 'react-aria-components';
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
  /**
   * Horizontal text alignment of the cell content.
   */
  align: keyof typeof textAlign;
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
}

// Component
// ---------------
export const TableCellContent = ({
  align,
  cellOverflow,
  cellVerticalAlign,
  children,
  className,
}: TableCellContentProps) => {
  const {
    overflow: tableOverflow = 'wrap',
    allowTextSelection = false,
    verticalAlign: tableVerticalAlign = 'middle',
  } = useTableContext();
  const tableOptions = useTableOptions();
  const selectionMode = tableOptions?.selectionMode ?? 'none';

  // Cell-level overrides table-level
  const overflow = cellOverflow ?? tableOverflow;
  const vAlign = cellVerticalAlign ?? tableVerticalAlign;

  // Determine if content should be selectable
  const isSelectable = allowTextSelection && selectionMode !== 'none';

  return (
    <div
      className={cn(
        textAlign[align],
        verticalAlign[vAlign],
        overflow === 'truncate' ? 'max-w-0 truncate' : 'wrap-break-word',
        isSelectable && 'cursor-text outline-none',
        className
      )}
      tabIndex={isSelectable ? -1 : undefined}
      {...(isSelectable ? stopPropagationProps : {})}
    >
      {children}
    </div>
  );
};
