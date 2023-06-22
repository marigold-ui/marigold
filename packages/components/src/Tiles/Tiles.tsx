import React, { ReactNode } from 'react';
import { GapSpaceProp, gapSpace, cn, createVar } from '@marigold/system';

export interface TilesProps extends GapSpaceProp {
  children: ReactNode;
  tilesWidth: string;
  stretch?: boolean;
  equalHeight?: boolean;
}

export const Tiles = ({
  space = 0,
  stretch = false,
  equalHeight = false,
  tilesWidth,
  children,
  ...props
}: TilesProps) => {
  let column = `min(${tilesWidth}, 100%)`;
  /**
   * Adding `minmax` with `1fr` will make the tiles distribute the
   * availble width between each other and use the `tilesWidth` as
   * breakpoint, e.g. when to move a tile into the next line.
   */
  if (stretch) {
    column = `minmax(${column}, 1fr)`;
  }

  return (
    <div
      {...props}
      className={cn(
        'grid',
        gapSpace[space],
        'grid-cols-[repeat(auto-fit,var(--column))]',
        equalHeight && 'auto-rows-[1fr]'
      )}
      style={createVar({ column, tilesWidth })}
    >
      {children}
    </div>
  );
};
