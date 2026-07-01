import { createContext, use, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ComponentClassNames } from '@marigold/system';
import { useClassNames, useSmallScreen } from '@marigold/system';
import type { SidebarState } from './useSidebarState';
import { useSidebarState } from './useSidebarState';

export type { SidebarState };

export interface SidebarContextValue {
  state: SidebarState;
  toggleSidebar: () => void;
  isMobile: boolean;
  classNames: ComponentClassNames<'Sidebar'>;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = (): SidebarContextValue => {
  const ctx = use(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within a <Sidebar.Provider>.');
  }
  return ctx;
};

export interface SidebarProviderProps {
  /** Children of the component. */
  children: ReactNode;
  /** Default open state for desktop sidebar. */
  defaultOpen?: boolean;
  /** Controlled open state for desktop sidebar. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** The visual style variant of the sidebar. */
  variant?: string;
  /** The size of the sidebar. */
  size?: string;
}

export const SidebarProvider = ({
  children,
  defaultOpen,
  open,
  onOpenChange,
  variant,
  size,
}: SidebarProviderProps) => {
  const isMobile = useSmallScreen();
  const classNames = useClassNames({ component: 'Sidebar', variant, size });

  const { state, toggleSidebar } = useSidebarState({
    defaultOpen,
    open,
    onOpenChange,
    isMobile,
  });

  const value = useMemo(
    () => ({ state, toggleSidebar, isMobile, classNames }),
    [state, toggleSidebar, isMobile, classNames]
  );

  return <SidebarContext value={value}>{children}</SidebarContext>;
};
