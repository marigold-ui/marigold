import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react';

import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface ColumnsProps {
  children?: ReactNode;
  columns: Array<number>;
  space?: ResponsiveStyleValue<string>;
  columnLimit?: number;
  collapseAt?: string | 0;
  stretch?: boolean;
}

export const Columns = ({
  space = 'none',
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
    <Box
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        height: stretch ? '100%' : undefined,
        gap: space,
        '> *': {
          /**
           * "Container Query": collapses at given width
           * (https://heydonworks.com/article/the-flexbox-holy-albatross/)
           */
          flexBasis: `calc(( ${collapseAt} - 100%) * 999)`,
        },
      }}
      {...props}
    >
      {Children.map(children, (child, idx) => (
        <Box
          css={{
            // Stretch each column to the given value
            flexGrow: columns[idx],
          }}
        >
          {isValidElement(child) ? cloneElement(child) : child}
        </Box>
      ))}
    </Box>
  );
};
