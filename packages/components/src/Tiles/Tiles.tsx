import { ReactNode } from 'react';

import { GapSpaceProp, cn, createVar, gapSpace } from '@marigold/system';

export interface TilesProps extends GapSpaceProp {
  /**
   * The children of the component.
   */
  children: ReactNode;

  /**
   * Set minimum width for all items inside.
   * @default '250px'
   */
  tilesWidth: string;

  /**
   * Tiles will stretch to available width and will distribute their width equally. Note that this can make them wider than the specified tiles width, but not smaller than the given "tilesWidth". Basically, this is full responsive mode.
   * @default false
   */
  stretch?: boolean;

  /**
   * If true, all items will have the size of the biggest item.
   * @default false
   */
  equalHeight?: boolean;
}

export const Tiles = ({
  space = 0,
  stretch = false,
  equalHeight = false,
  tilesWidth = '250px',
  children,
  ...props
}: TilesProps) => {
  let column = `min(${tilesWidth}, 100%)`;
  /**
   * Adding `minmax` with `1fr` will make the tiles distribute the
   * available width between each other and use the `tilesWidth` as
   * breakpoint, e.g., when to move a tile into the next line.
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
