import type { ReactNode } from 'react';

export interface DialogContentProps {
  children?: ReactNode;
}

export const DialogContent = ({ children }: DialogContentProps) => (
  <div className="[grid-area:content]">{children}</div>
);
