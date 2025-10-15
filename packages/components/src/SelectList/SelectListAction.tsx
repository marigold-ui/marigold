import type { ReactNode } from 'react';

export interface SelectListActionProps {
  children: ReactNode;
}

export const SelectListAction = ({ children }: SelectListActionProps) => (
  <div className="col-start-2 row-start-3">{children}</div>
);
