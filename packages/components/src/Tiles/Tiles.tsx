import React from 'react';
import { Box } from '../Box';
import { ResponsiveStyleValue } from '@marigold/system';

export interface TilesProps {
  space?: ResponsiveStyleValue<string>;
  itemMinWidth?: ResponsiveStyleValue<string>;
}

export const Tiles: React.FC<TilesProps> = React.forwardRef(function Tiles(
  { space = 'none', itemMinWidth = '250px', children, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      display="grid"
      __baseCSS={{
        gap: space,
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${itemMinWidth}, 100%), 1fr))`,
      }}
      {...props}
    >
      {children}
    </Box>
  );
});
