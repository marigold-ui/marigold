import type { PropsWithChildren } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';

export type AppLayoutSidebarProps = PropsWithChildren;

export const AppLayoutSidebar = ({ children }: AppLayoutSidebarProps) => (
  <Sidebar>{children}</Sidebar>
);
