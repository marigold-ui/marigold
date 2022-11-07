import React, { ReactNode } from 'react';
import { Box } from '../Box';
import { ResponsiveStyleValue, useTheme } from '@marigold/system';

export interface TilesProps {
  children: ReactNode;
  tilesWidth: string;
  space?: ResponsiveStyleValue<string>;
  stretch?: boolean;
  equalHeight?: boolean;
}

export const Tiles = ({
  space = 'none',
  stretch = false,
  equalHeight = false,
  tilesWidth,
  children,
  ...props
}: TilesProps) => {
  /**
   * Allow to use design tokens for the tiles width.
   */
  const { css } = useTheme();
  const { width } = css({ width: tilesWidth });

  let column = `min(${typeof width === 'number' ? `${width}px` : width}, 100%)`;
  /**
   * Adding `minmax` with `1fr` will make the tiles distribute the
   * availble width between each other and use the `tilesWidth` as
   * breakpoint, e.g. when to move a tile into the next line.
   */
  if (stretch) {
    column = `minmax(${column}, 1fr)`;
  }

  return (
    <Box
      {...props}
      css={{
        display: 'grid',
        gap: space,
        gridTemplateColumns: `repeat(auto-fit, ${column})`,
        /**
         * Make height of all tiles in each row
         * match the heighest tile.
         */
        gridAutoRows: equalHeight ? '1fr' : undefined,
      }}
    >
      {children}
    </Box>
  );
};
