import type { ReactNode } from 'react';

export interface FilterProps {
  children?: ReactNode;
}

export const Filter = ({ children }: FilterProps) => <div>{children}</div>;
