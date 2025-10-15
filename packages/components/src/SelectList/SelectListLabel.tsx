import type { ReactNode } from 'react';

export interface SelectListLabelProps {
  children: ReactNode;
}

export const SelectListLabel = ({ children }: SelectListLabelProps) => {
  return (
    <div className="col-start-2 row-start-1 flex flex-nowrap items-start gap-2 font-semibold">
      {children}
    </div>
  );
};
