import { ReactNode, Ref, forwardRef } from 'react';

// Props
// ---------------
export interface AppLayoutProps {
  children?: ReactNode;
}

// Sub-components
// ---------------
const AppLayoutHeader = ({ children }: { children?: ReactNode }) => {
  return <div className="z-1 [grid-area:header]">{children}</div>;
};

const AppLayoutSidebar = ({ children }: { children?: ReactNode }) => {
  return <aside className="[grid-area:sidebar]">{children}</aside>;
};

const AppLayoutMain = ({ children }: { children?: ReactNode }) => {
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
        className="grid h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden [grid-template-areas:'sidebar_header'_'sidebar_main']"
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
