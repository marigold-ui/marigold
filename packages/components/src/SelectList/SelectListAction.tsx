import { ReactNode } from 'react';

interface SelectListAction {
  children: ReactNode;
}

export const SelectListAction = ({ children }: SelectListAction) => (
  <div className="order-last">{children}</div>
);
