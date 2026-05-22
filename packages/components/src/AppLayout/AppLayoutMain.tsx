import type { PropsWithChildren } from 'react';

export type AppLayoutMainProps = PropsWithChildren;

export const AppLayoutMain = ({ children }: AppLayoutMainProps) => (
  <main className="relative min-w-0 [grid-area:main]">{children}</main>
);
