import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react';

import { cn, createVar, gapSpace, GapSpaceProp } from '@marigold/system';

export interface ColumnsProps extends GapSpaceProp {
  children?: ReactNode;
  columns: Array<number>;
  collapseAt?: string | 0;
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
            'grow-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]'
          )}
          style={createVar({ collapseAt, columnSize: columns[idx] })}
        >
          {isValidElement(child) ? cloneElement(child) : child}
        </div>
      ))}
    </div>
  );
};
