import type { ComponentProps } from 'react';
import { use } from 'react';
import { cn } from '@marigold/system';
import { TableStickyContext } from './Context';

// Helper
// ---------------
// By column index: only the injected drag and selection columns can sit before
// a sticky start column, each `injectedColumnWidth` (36px) wide in `TableHeader`.
const startClassNames = [
  'sticky z-1 start-0',
  'sticky z-1 start-[36px]',
  'sticky z-1 start-[72px]',
];
const endClassName = 'sticky z-1 end-0';

// React Aria scrolls a focused cell, or what is focused inside it, into view
// with `scrollIntoView`, which honours `scroll-margin` but not what is stuck
// over the scrollport. Not inside sticky cells, which never need scrolling to.
const clearOfSticky =
  '[scroll-margin-inline:var(--table-sticky-start)_var(--table-sticky-end)] **:[scroll-margin-inline:var(--table-sticky-start)_var(--table-sticky-end)]';

// Element
// ---------------
interface StickyElementProps extends ComponentProps<'td'> {
  as: 'th' | 'td';
  columnIndex?: number | null;
}

const StickyElement = ({
  as,
  columnIndex,
  className,
  ...props
}: StickyElementProps) => {
  const stickyColumns = use(TableStickyContext);
  // A cell spanning several columns would hold all of them in place.
  const edge =
    columnIndex == null || (props.colSpan ?? 1) > 1
      ? undefined
      : stickyColumns[columnIndex];

  const sticky =
    edge === 'start'
      ? startClassNames[columnIndex ?? 0]
      : edge === 'end'
        ? endClassName
        : stickyColumns.length > 0
          ? clearOfSticky
          : undefined;

  const cellProps = {
    ...props,
    'data-sticky': edge,
    className: cn(className, sticky),
  };

  return as === 'th' ? <th {...cellProps} /> : <td {...cellProps} />;
};

/**
 * `render` for a `<Column>`. React Aria renders it inside the table, where
 * the sticky columns are known.
 */
export const renderStickyColumn = (props: object) => {
  // Only a virtualized table renders a `<div>`, and Marigold's never is.
  const thProps = props as ComponentProps<'td'>;
  // `aria-colindex` is 1-based.
  const columnIndex = Number(thProps['aria-colindex']) - 1;

  return <StickyElement as="th" columnIndex={columnIndex} {...thProps} />;
};

export const renderStickyCell = (
  props: object,
  { columnIndex }: { columnIndex?: number | null }
) => (
  <StickyElement
    as="td"
    columnIndex={columnIndex}
    {...(props as ComponentProps<'td'>)}
  />
);
