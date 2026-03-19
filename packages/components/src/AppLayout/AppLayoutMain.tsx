import type { PropsWithChildren } from 'react';

export type AppLayoutMainProps = PropsWithChildren;

export const AppLayoutMain = ({ children }: AppLayoutMainProps) => (
  <main className="overflow-y-auto [grid-area:main]">{children}</main>
);
