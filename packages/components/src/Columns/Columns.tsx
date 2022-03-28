import React, { Children } from 'react';

import { CSSObject, ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface ColumnsProps {
  columns: Array<number>;
  space?: ResponsiveStyleValue<string>;
  columnLimit?: number;
  collapseAt?: string;
}

export const Columns: React.FC<ColumnsProps> = ({
  space = 'none',
  columns,
  collapseAt = '40em',
  children,
  ...props
}) => {
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
      __baseCSS={{
        flexWrap: 'wrap',
        gap: space,
        '> *': {
          // display breakpoint at collapseAt value
          flexBasis: `calc(( ${collapseAt} - 100%) * 999)`,
        },
      }}
      css={Object.assign({}, ...getColumnWidths!) as CSSObject}
      {...props}
    >
      {children}
    </Box>
  );
};
