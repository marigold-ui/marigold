import type { ReactNode } from 'react';

export interface SelectListDescriptionProps {
  children: ReactNode;
}

export const SelectListDescription = ({
  children,
}: SelectListDescriptionProps) => {
  return (
    <div className="col-start-2 row-start-2 text-sm text-gray-700">
      {children}
    </div>
  );
};
