import type { ReactNode } from 'react';

// Props
// ---------------
export interface GridAreaProps {
  /**
   * Name of the grid area slot.
   */
  name: string;
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Components
// ---------------
export const GridArea = ({ name, children }: GridAreaProps) => (
  <div style={{ gridArea: name }}>{children}</div>
);
