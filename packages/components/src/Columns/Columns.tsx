import React, { Children, ReactNode } from 'react';

import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface ColumnsProps {
  children?: ReactNode;
  columns: Array<number>;
  space?: ResponsiveStyleValue<string>;
  columnLimit?: number;
  collapseAt?: string;
}

export const Columns = ({
  space = 'none',
  columns,
  collapseAt = '40em',
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

  // create an array to get column widths
  const getColumnWidths = columns.map((column, index) => {
    return {
      [`> :nth-of-type(${index + 1})`]: {
        flexGrow: column,
      },
    };
  });

  return (
    <Box
      display="flex"
      css={Object.assign(
        {
          flexWrap: 'wrap',
          gap: space,
          '> *': {
            // display breakpoint at collapseAt value
            flexBasis: `calc(( ${collapseAt} - 100%) * 999)`,
          },
        },
        ...getColumnWidths!
      )}
      {...props}
    >
      {children}
    </Box>
  );
};
