import { Children, ReactNode } from 'react';

import { GapSpaceProp, cn, createVar, gapSpace } from '@marigold/system';

export interface ColumnsProps extends GapSpaceProp {
  /**
   * The children of the component.
   */
  children?: ReactNode;
  /**
   * An array of numbers to set the size of the children. The columns array length and the count of children must be the same. Write "fit" for the column you want to have it fitting the contents width and height.
   */
  columns: Array<number | 'fit'>;
  /**
   * Collapse children into a vertical layout at given width. Note that `collapseAt` is based on the total element width, and not the window width. With a default value of "0" columns will not collapse by default.
   */
  collapseAt?: string;
  /**
   * Stretch to height of parent container.
   * @default false
   */
  stretch?: boolean;
}

export const Columns = ({
  space = 0,
  columns,
  collapseAt = '0em',
  stretch,
  children,
  ...props
}: ColumnsProps) => {
  if (Children.count(children) !== columns.length) {
    throw new Error(
      `Columns: expected ${columns.length} children, got ${Children.count(
        children
      )}`
    );
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-stretch',
        stretch && 'h-full',
        gapSpace[space]
      )}
      {...props}
    >
      {Children.map(children, (child, idx) => (
        <div
          className={cn(
            columns[idx] === 'fit' ? 'flex h-fit w-fit' : 'flex-[--columnSize]',
            'basis-[calc((var(--collapseAt)_-_100%)_*_999)]'
          )}
          style={createVar({
            collapseAt,
            columnSize: columns[idx],
          })}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
