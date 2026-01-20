import type { ReactNode } from 'react';
import type { HeightProp, SpaceProp } from '@marigold/system';
import {
  alignment,
  cn,
  createSpacingVar,
  height as twHeight,
} from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';
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
export interface GridProps
  extends
    SpaceProp<'section' | 'fieldX' | 'fieldY' | 'container' | 'group'>,
    HeightProp,
    AriaRegionProps {
  /**
   * Specifies the named grid areas, much like `grid-template-areas`.
   */
  areas: string[];
  /**
   * Specifies the width of each column in the grid.
   */
  columns: TemplateValue[];
  /**
   * Specifies the height of each rows in the grid.
   */
  rows: TemplateValue[];
  /**
   * Children of the layout.
   */
  children?: ReactNode;
  /**
   * Horizontal alignment for the children.
   */
  alignX?: keyof typeof alignment.horizontal.alignmentX;

  /**
   * Vertical alignment for the children.
   */
  alignY?: keyof typeof alignment.horizontal.alignmentY;
}

// Component
// ---------------
export const Grid = ({
  children,
  areas,
  columns,
  rows,
  alignX,
  alignY,
  height = 'auto',
  space = 0,
  ...props
}: GridProps) => {
  return (
    <div
      className={cn(
        'grid gap-(--space)',
        alignX && alignment?.horizontal?.alignmentX[alignX],
        alignY && alignment?.horizontal?.alignmentY[alignY],
        twHeight[height]
      )}
      style={{
        gridTemplateAreas: parseGridAreas(areas),
        gridTemplateColumns: parseTemplateValue(columns),
        gridTemplateRows: parseTemplateValue(rows),
        ...createSpacingVar('space', `${space}`),
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.Area = GridArea;
