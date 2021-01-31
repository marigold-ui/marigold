import React from 'react';
import { useStyles, system } from '@marigold/system';

type ColumnProps = {
  variant?: string;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const Column = system<ColumnProps, 'div'>(
  ({ variant = 'column', width = 12, className, children, ...props }) => {
    const classNames = useStyles(
      {
        variant: `layout.${variant}`,
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
