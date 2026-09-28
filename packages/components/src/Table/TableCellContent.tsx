import { type ReactNode, use, useEffect } from 'react';
import type { Key } from 'react-aria-components';
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
  /** Names the component in the dev warning below, so it points at the author's code. */
  missingTextValueOn?: 'Table.Cell' | 'Table.EditableCell';
  /** The cell's key, from the `<Cell>` render prop. Used to find its row. */
  cellKey?: Key;
}

// Development warning
// ---------------
const RowHeaderNameWarning = ({
  columnIndex,
  cellKey,
  component,
}: {
  columnIndex?: number | null;
  cellKey?: Key;
  component: 'Table.Cell' | 'Table.EditableCell';
}) => {
  const state = use(TableStateContext);
  const { warnedMissingTextValue } = useTableContext();

  const column =
    columnIndex != null ? state?.collection.columns[columnIndex] : undefined;
  // Only a row header names its row, so unreadable content in any other column
  // is fine and has to stay silent.
  const isRowHeader =
    column != null &&
    state != null &&
    state.collection.rowHeaderColumnKeys.has(column.key);

  // React Aria takes a row's own `textValue` before any cell's, so a row named
  // that way needs nothing from its row header.
  const parentKey =
    cellKey != null ? state?.collection.getItem(cellKey)?.parentKey : null;
  const isRowNamed =
    parentKey != null && !!state?.collection.getItem(parentKey)?.textValue;

  useEffect(() => {
    if (!isRowHeader || isRowNamed || warnedMissingTextValue.has(component))
      return;

    warnedMissingTextValue.add(component);
    console.warn(
      `A \`textValue\` prop is required for <${component}> elements in a \`rowHeader\` column whose children are not plain text, in order to support accessibility features such as type to select.`
    );
  }, [isRowHeader, isRowNamed, component, warnedMissingTextValue]);

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
  cellKey,
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
          cellKey={cellKey}
          component={missingTextValueOn}
        />
      )}
      {children}
    </div>
  );
};
