import { createContext, use, useEffect, useMemo, useState } from 'react';
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
  /**
   * Whether there is anything for `Sidebar.Toggle` / Cmd+B to collapse. Always
   * true in single-column mode; a rail lowers it while a direct link (no
   * section panel) is selected on desktop.
   */
  panelAvailable: boolean;
  setPanelAvailable: (available: boolean) => void;
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

  const [panelAvailable, setPanelAvailable] = useState(true);

  // Keyboard shortcut: Cmd+B / Ctrl+B. Lives here (not in useSidebarState) so
  // it can respect `panelAvailable` — with a rail on a direct-link page there
  // is no panel to collapse, so the shortcut is inert like the toggle button.
  const toggleDisabled = !isMobile && !panelAvailable;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!toggleDisabled) toggleSidebar();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleSidebar, toggleDisabled]);

  const value = useMemo(
    () => ({
      state,
      toggleSidebar,
      isMobile,
      classNames,
      panelAvailable,
      setPanelAvailable,
    }),
    [state, toggleSidebar, isMobile, classNames, panelAvailable]
  );

  return <SidebarContext value={value}>{children}</SidebarContext>;
};
