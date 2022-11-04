import React, { ReactNode } from 'react';
import { Box } from '../Box';
import { ResponsiveStyleValue } from '@marigold/system';

export interface TilesProps {
  children: ReactNode;
  space?: ResponsiveStyleValue<string>;
  tilesWidth?: ResponsiveStyleValue<string>;
  itemMinWidth?: ResponsiveStyleValue<string>;
}

export const Tiles = React.forwardRef<HTMLDivElement, TilesProps>(
  ({ space = 'none', itemMinWidth = '250px', children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        display="grid"
        __baseCSS={{
          gap: space,
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${itemMinWidth}, 100%), 1fr))`,
          // Make height of all tiles equal
          gridAutoRows: '1fr',
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
