import type { ReactNode } from 'react';

/**
 * Stand-in for the browser viewport in page-level component demos
 * (e.g. `AppLayout`). The preview pane isn't tall enough to let the
 * real `min-h-dvh` / `h-dvh` / page-scroll behaviour play out, so this
 * wrapper turns itself into a scroll root and clamps those properties
 * to its own size.
 */
export const DemoViewport = ({ children }: { children: ReactNode }) => (
  <div className="-m-4 h-[400px] overflow-y-auto overscroll-contain [&_aside]:!h-[400px] [&>div]:!min-h-0">
    {children}
  </div>
);
