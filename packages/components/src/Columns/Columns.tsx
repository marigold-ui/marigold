import { Children, ReactNode } from 'react';

import { GapSpaceProp, cn, createVar, gapSpace } from '@marigold/system';

export interface ColumnsProps extends GapSpaceProp {
  children?: ReactNode;
  columns: Array<number | 'fit'>;
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
            columns[idx] !== 'fit'
              ? 'flex-[--columnSize] basis-[calc((var(--collapseAt)_-_100%)_*_999)]'
              : 'flex w-fit'
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

//  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

// have to change to display grid and set grid-template-columns

// flex-1 for the childs with full width

// 'grid-cols-[repeat(auto-fit,var(--column))]'

// column braucht prop die sagt ich bin das fixed child wie weiß das kind welches ob es die prop hat
// flex-grow 1 auf alle elemente außer das fixed
// prop zb fixedChild => dann <Columns columns=['2,4,5'] fixedColumn=['3']>
// Wie spielen die column und die prop dann zusammen? was macht basis
