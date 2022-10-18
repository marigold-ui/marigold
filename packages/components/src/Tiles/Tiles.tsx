import React, { ReactNode } from 'react';
import { Box } from '../Box';
import { ResponsiveStyleValue } from '@marigold/system';

export interface TilesProps {
  children: ReactNode;
  space?: ResponsiveStyleValue<string>;
  itemMinWidth?: ResponsiveStyleValue<string>;
  gridAutoRows?: boolean;
}

export const Tiles = React.forwardRef<HTMLDivElement, TilesProps>(
  (
    {
      space = 'none',
      itemMinWidth = '250px',
      gridAutoRows,
      children,
      ...props
    },
    ref
  ) => (
    <Box
      ref={ref}
      display="grid"
      __baseCSS={{
        gap: space,
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${itemMinWidth}, 100%), 1fr))`,
        gridAutoRows: gridAutoRows ? '1fr' : 'none',
      }}
      {...props}
    >
      {children}
    </Box>
  )
);
