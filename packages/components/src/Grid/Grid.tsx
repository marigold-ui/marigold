import type { ReactNode } from 'react';

import type { GapSpaceProp, HeightProp } from '@marigold/system';
import { cn, gapSpace, height as twHeight } from '@marigold/system';

import { GridArea } from './GridArea';

// Helpers
// ---------------
export type TemplateValue =
  | 'none'
  | 'auto'
  | 'min-content'
  | 'max-content'
  // Allow autocomplete with fixed template strings (see https://github.com/microsoft/TypeScript/issues/29729)
  | (string & {})
  | number;

const parseGridAreas = (areas: string[]) =>
  areas.map(area => `"${area}"`).join('\n');

const parseTemplateValue = (values: TemplateValue[]) =>
  values.map(val => (typeof val === 'number' ? `${val}fr` : val)).join(' ');

// Props
// ---------------
export interface GridProps extends GapSpaceProp, HeightProp {
  areas: string[];
  columns: TemplateValue[];
  rows: TemplateValue[];
  /**
   * Children of the layout.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const Grid = ({
  children,
  areas,
  columns,
  rows,
  height = 'auto',
  space = 0,
  ...props
}: GridProps) => {
  return (
    <div
      className={cn('grid', gapSpace[space], twHeight[height])}
      style={{
        gridTemplateAreas: parseGridAreas(areas),
        gridTemplateColumns: parseTemplateValue(columns),
        gridTemplateRows: parseTemplateValue(rows),
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.Area = GridArea;
