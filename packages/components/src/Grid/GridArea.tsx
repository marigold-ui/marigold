import type { ReactNode } from 'react';

// Props
// ---------------
export interface GridAreaProps {
  name: string;
  children?: ReactNode;
}

// Components
// ---------------
export const GridArea = ({ name, children }: GridAreaProps) => (
  <div style={{ gridArea: name }}>{children}</div>
);
