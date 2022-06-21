import React, { ReactNode } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';
export interface TilesProps {
  children: ReactNode;
  space?: ResponsiveStyleValue<string>;
  itemMinWidth?: ResponsiveStyleValue<string>;
}
export declare const Tiles: React.ForwardRefExoticComponent<
  TilesProps & React.RefAttributes<HTMLDivElement>
>;
//# sourceMappingURL=Tiles.d.ts.map
