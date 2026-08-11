import type { ReactNode } from 'react';
import { useTableContext } from './Context';
import { TableExpandButton } from './TableExpandButton';

export interface TableTreeColumnProps {
  /** Whether the row has nested rows, i.e. whether it gets an expand control. */
  hasChildItems?: boolean;
  /** Whether the row is currently expanded. */
  isExpanded?: boolean;
  /** The cell's own content. Needs `col-start-2` to land beside the gutter. */
  children: ReactNode;
}

/**
 * Leading gutter and indentation for whichever cell sits in the `treeColumn`.
 * Every cell component that can appear there has to render this, otherwise the
 * row loses its only expand control.
 */
export const TableTreeColumn = ({
  hasChildItems,
  isExpanded,
  children,
}: TableTreeColumnProps) => {
  const { classNames } = useTableContext();

  return (
    <div className={classNames.treeIndent}>
      {hasChildItems && <TableExpandButton expanded={isExpanded} />}
      {children}
    </div>
  );
};
