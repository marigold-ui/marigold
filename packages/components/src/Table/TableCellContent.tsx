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
   * The cell component to name in the development warning below, set only when
   * that cell resolved no `textValue`. Carrying the name rather than a bare
   * boolean keeps the warning about the component the author actually wrote.
   */
  missingTextValueOn?: 'Table.Cell' | 'Table.EditableCell';
}

// Development warning
// ---------------
/**
 * Warns that a row header cell carries content React Aria cannot read, leaving
 * its row unnamed for type to select and for screen readers.
 *
 * React Aria raises the equivalent for `GridListItem`, `ListBoxItem`, `Tag` and
 * `TreeItem`, and for nothing in a table, which is why unnamed rows go
 * unnoticed. It is a separate component so that the hooks it needs, and the
 * collection lookup it does, exist only where the warning does. The call site
 * renders it behind `process.env.NODE_ENV`, so production carries none of it.
 */
const RowHeaderNameWarning = ({
  columnIndex,
  component,
}: {
  columnIndex?: number | null;
  component: 'Table.Cell' | 'Table.EditableCell';
}) => {
  const state = use(TableStateContext);
  const warnedRef = useRef(false);

  const column =
    columnIndex != null ? state?.collection.columns[columnIndex] : undefined;
  // Only a row header names its row, so unreadable content in any other column
  // is fine and has to stay silent.
  const isRowHeader =
    column != null &&
    state != null &&
    state.collection.rowHeaderColumnKeys.has(column.key);

  useEffect(() => {
    if (!isRowHeader || warnedRef.current) return;

    warnedRef.current = true;
    console.warn(
      `A \`textValue\` prop is required for <${component}> elements in a \`rowHeader\` column whose children are not plain text, in order to support accessibility features such as type to select.`
    );
  }, [isRowHeader, component]);

  return null;
};

// Component
// ---------------
export const TableCellContent = ({
  columnIndex,
  alignX,
  cellOverflow,
  children,
  className,
  allowTextSelection,
  missingTextValueOn,
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
      {process.env.NODE_ENV !== 'production' && missingTextValueOn && (
        <RowHeaderNameWarning
          columnIndex={columnIndex}
          component={missingTextValueOn}
        />
      )}
      {children}
    </div>
  );
};
