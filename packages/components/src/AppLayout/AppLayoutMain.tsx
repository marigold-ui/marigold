import type { PropsWithChildren } from 'react';

export type AppLayoutMainProps = PropsWithChildren;

export const AppLayoutMain = ({ children }: AppLayoutMainProps) => (
  <main className="relative flex flex-col gap-4 overflow-y-auto px-4 [grid-area:main]">
    {children}
  </main>
);
