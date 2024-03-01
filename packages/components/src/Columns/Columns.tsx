import { Children, ReactNode } from 'react';

import { GapSpaceProp, cn, createVar, gapSpace } from '@marigold/system';

export interface ColumnsProps extends GapSpaceProp {
  children?: ReactNode;
  columns: Array<number | 'fit'>;
  collapseAt?: string;
  stretch?: boolean;
}

export const Columns = ({
  space = 0,
  columns,
  collapseAt,
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
            columns[idx] !== 'fit' ? 'flex-[--columnSize]' : 'flex w-fit',
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
