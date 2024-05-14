import type { ReactNode } from 'react';

// Props
// ---------------
export interface SlotProps {
  name: string;
  children?: ReactNode;
}

// Components
// ---------------
export const Slot = ({ name, children }: SlotProps) => (
  <div style={{ gridArea: name }}>{children}</div>
);
