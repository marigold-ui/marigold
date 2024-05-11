import type { ReactNode } from 'react';

import type { GapSpaceProp } from '@marigold/system';
import { cn, gapSpace } from '@marigold/system';

import { Slot } from './LayoutSlot';

// Helpers
// ---------------
// TODO: What to allow here? cast number so fractions? Allow tailwind values for sizing (e.g. "4" -> "16px"?)
export type TemplateValue = string | number;

const parseGridAreas = (areas: string[]) =>
  areas.map(area => `"${area}"`).join('\n');

const parseTemplateValue = (values: TemplateValue[]) =>
  values
    .map(val => {
      if (typeof val === 'number') {
        return `${val}fr`;
      }

      return val;
    })
    .join(' ');

// Props
// ---------------
export interface LayoutProps extends GapSpaceProp {
  areas: string[];
  // TODO: make rows/columns more strict (tailwind values?)
  columns: TemplateValue[];
  rows: TemplateValue[];
  // height?
  /**
   * Children of the layout.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const Layout = ({
  children,
  areas,
  columns,
  rows,
  space = 0,
}: LayoutProps) => {
  return (
    <div
      className={cn('grid', gapSpace[space])}
      style={{
        gridTemplateAreas: parseGridAreas(areas),
        gridTemplateColumns: parseTemplateValue(columns),
        gridTemplateRows: parseTemplateValue(rows),
      }}
    >
      {children}
    </div>
  );
};

Layout.Slot = Slot;
