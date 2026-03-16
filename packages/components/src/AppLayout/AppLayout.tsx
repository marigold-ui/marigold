import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

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
  children?: ReactNode;
}

export interface AppLayoutHeaderProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

export interface AppLayoutSidebarProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

export interface AppLayoutMainProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Sub-components
// ---------------
const AppLayoutHeader = ({ children }: AppLayoutHeaderProps) => {
  return (
    <div className="z-1 flex h-(--app-layout-header-height) [grid-area:header] [&>*]:h-full [&>*]:w-full">
      {children}
    </div>
  );
};

const AppLayoutSidebar = ({ children }: AppLayoutSidebarProps) => {
  return <div className="[grid-area:sidebar]">{children}</div>;
};

const AppLayoutMain = ({ children }: AppLayoutMainProps) => {
  return <main className="overflow-y-auto [grid-area:main]">{children}</main>;
};

// Component
// ---------------
interface AppLayoutComponent extends React.ForwardRefExoticComponent<
  AppLayoutProps & React.RefAttributes<HTMLDivElement>
> {
  Header: typeof AppLayoutHeader;
  Sidebar: typeof AppLayoutSidebar;
  Main: typeof AppLayoutMain;
}

const _AppLayout = forwardRef(
  ({ children, ...props }: AppLayoutProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="grid h-dvh grid-cols-[auto_1fr] grid-rows-[var(--app-layout-header-height,auto)_1fr] overflow-hidden [--app-layout-header-height:3.5rem] [grid-template-areas:'sidebar_header'_'sidebar_main']"
        {...props}
      >
        {children}
      </div>
    );
  }
) as AppLayoutComponent;

_AppLayout.Header = AppLayoutHeader;
_AppLayout.Sidebar = AppLayoutSidebar;
_AppLayout.Main = AppLayoutMain;

export { _AppLayout as AppLayout };
