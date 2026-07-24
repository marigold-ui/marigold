import { createContext, use } from 'react';
import type { PropsWithChildren } from 'react';

export interface CollapsibleContextProps {
  variant?: string;
  size?: string;
}

export const CollapsibleContext = createContext<
  CollapsibleContextProps | undefined
>(undefined);

export const CollapsibleProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: CollapsibleContextProps }>) => (
  <CollapsibleContext value={value}>{children}</CollapsibleContext>
);

export const useCollapsibleContext = () => {
  const ctx = use(CollapsibleContext);
  if (!ctx) {
    throw new Error(
      'useCollapsibleContext must be used within a CollapsibleProvider'
    );
  }
  return ctx;
};
