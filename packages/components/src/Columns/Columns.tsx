import React from 'react';
import { useStyles, system } from '@marigold/system';

type ColumnsProps = {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const Columns = system<ColumnsProps, 'div'>(
  ({ width = 12, className, children, ...props }) => {
    const classNames = useStyles(
      {
        width: `${(width / 12) * 100}%`,
      },
      className
    );

    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
);
