import type { PropsWithChildren, Ref } from 'react';

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

// Sub-components
// ---------------
const AppLayoutHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="z-1 flex h-(--app-layout-header-height) [grid-area:header] [&>*]:h-full [&>*]:w-full">
      {children}
    </div>
  );
};

const AppLayoutSidebar = ({ children }: PropsWithChildren) => {
  return <div className="[grid-area:sidebar]">{children}</div>;
};

const AppLayoutMain = ({ children }: PropsWithChildren) => {
  return <main className="overflow-y-auto [grid-area:main]">{children}</main>;
};

// Component
// ---------------
interface AppLayoutComponent {
  (props: AppLayoutProps): React.JSX.Element;
  Header: typeof AppLayoutHeader;
  Sidebar: typeof AppLayoutSidebar;
  Main: typeof AppLayoutMain;
}

const _AppLayout = (({ children, ref, ...props }: AppLayoutProps) => {
  return (
    <div
      ref={ref}
      className="grid h-dvh grid-cols-[auto_1fr] grid-rows-[var(--app-layout-header-height,auto)_1fr] overflow-hidden [--app-layout-header-height:3.5rem] [grid-template-areas:'sidebar_header'_'sidebar_main']"
      {...props}
    >
      {children}
    </div>
  );
}) as AppLayoutComponent;

_AppLayout.Header = AppLayoutHeader;
_AppLayout.Sidebar = AppLayoutSidebar;
_AppLayout.Main = AppLayoutMain;

export { _AppLayout as AppLayout };
