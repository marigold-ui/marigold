import type { ReactNode } from 'react';

export interface DialogFooterProps {
  children?: ReactNode;
}

export const DialogFooter = ({ children }: DialogFooterProps) => (
  <div className="[grid-area:footer]">{children}</div>
);
