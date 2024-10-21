import type { ReactNode } from 'react';

export interface DialogActions {
  children?: ReactNode;
}

export const DialogActions = ({ children }: DialogActions) => (
  <div className="flex gap-2 [grid-area:actions]">{children}</div>
);
