import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Box } from '../Box';

type ColumnProps = {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const Column = system<ColumnProps, 'div'>(
  ({ width = 12, className, children, ...props }) => {
    const classNames = useStyles({}, className);

    return (
      <Box width={`${(width / 12) * 100}%`} className={classNames} {...props}>
        {children}
      </Box>
    );
  }
);
