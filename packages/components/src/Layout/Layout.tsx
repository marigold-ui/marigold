import type { ReactNode } from 'react';

import type { GapSpaceProp } from '@marigold/system';
import { cn, gapSpace } from '@marigold/system';

import { Slot } from './LayoutSlot';

// Helpers
// ---------------
const parseGridAreas = (areas: string[]) =>
  areas.map(area => `"${area}"`).join('\n');

// Props
// ---------------
export interface LayoutProps extends GapSpaceProp {
  areas: string[];
  // TODO: make rows/columns more strict (tailwind values?)
  columns?: string[];
  rows?: string[];
  // height?
  children?: ReactNode;
}

// Component
// ---------------
export const Layout = ({ children, areas, space = 0 }: LayoutProps) => {
  return (
    <div
      className={cn('grid', gapSpace[space])}
      style={{ gridTemplateAreas: parseGridAreas(areas) }}
    >
      {children}
    </div>
  );
};

Layout.Slot = Slot;
