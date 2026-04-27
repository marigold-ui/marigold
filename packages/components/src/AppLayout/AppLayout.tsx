import type { Ref } from 'react';
import { AppLayoutHeader } from './AppLayoutHeader';
import { AppLayoutMain } from './AppLayoutMain';
import { AppLayoutSidebar } from './AppLayoutSidebar';

export type { AppLayoutHeaderProps } from './AppLayoutHeader';
export type { AppLayoutMainProps } from './AppLayoutMain';
export type { AppLayoutSidebarProps } from './AppLayoutSidebar';

// Props
// ---------------
type RemovedProps = 'className' | 'style';
export interface AppLayoutProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  RemovedProps
> {
  /**
   * Children of the component.
   */
  children?: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
}

// Component
// ---------------
interface AppLayoutComponent {
  (props: AppLayoutProps): React.JSX.Element;
  Header: typeof AppLayoutHeader;
  Sidebar: typeof AppLayoutSidebar;
  Main: typeof AppLayoutMain;
}

const _AppLayout = (({ children, ref, ...props }: AppLayoutProps) => (
  <div
    ref={ref}
    className="grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[3.5rem_1fr] [grid-template-areas:'sidebar_header'_'sidebar_main']"
    {...props}
  >
    {children}
  </div>
)) as AppLayoutComponent;

_AppLayout.Header = AppLayoutHeader;
_AppLayout.Sidebar = AppLayoutSidebar;
_AppLayout.Main = AppLayoutMain;

export { _AppLayout as AppLayout };
