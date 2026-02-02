import type { PropsWithChildren } from 'react';

// Helpers
// ---------------
/**
 * Prevents event propagration for table cells, to make their content
 * selectable without interfering with row selection.
 */
const stopProgragationProps = {
  onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
  onPointerDown: (e: React.PointerEvent) => e.stopPropagation(),
  onTouchStart: (e: React.TouchEvent) => e.stopPropagation(),
};

// Props
// ---------------
export type TableSelectableCellProps = PropsWithChildren;

// Componen
// ---------------
export const TableSelectableCell = ({ children }: TableSelectableCellProps) => (
  <div
    className="cursor-text outline-none"
    tabIndex={-1}
    {...stopProgragationProps}
  >
    {children}
  </div>
);
