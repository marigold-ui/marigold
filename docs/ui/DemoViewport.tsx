import type { ReactNode } from 'react';

/**
 * Stand-in for the browser viewport in page-level component demos
 * (e.g. `AppShell`). The preview pane isn't tall enough to let the
 * real viewport-height / page-scroll behaviour play out, so this
 * wrapper turns itself into a scroll root and announces its own
 * height to the shell components via `--ui-viewport-height`.
 */
export const DemoViewport = ({ children }: { children: ReactNode }) => (
  <div className="-m-4 h-[400px] overflow-y-auto overscroll-contain [--ui-viewport-height:400px]">
    {children}
  </div>
);
