import type { PropsWithChildren } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';

export type AppLayoutSidebarProps = PropsWithChildren;

export const AppLayoutSidebar = ({ children }: AppLayoutSidebarProps) => (
  <div className="[grid-area:sidebar]">
    <Sidebar>{children}</Sidebar>
  </div>
);
