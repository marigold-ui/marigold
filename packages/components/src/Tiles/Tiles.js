import React from 'react';
import { Box } from '../Box';
export const Tiles = React.forwardRef(
  ({ space = 'none', itemMinWidth = '250px', children, ...props }, ref) =>
    React.createElement(
      Box,
      {
        ref: ref,
        display: 'grid',
        __baseCSS: {
          gap: space,
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${itemMinWidth}, 100%), 1fr))`,
        },
        ...props,
      },
      children
    )
);
//# sourceMappingURL=Tiles.js.map
