import { createContext, use, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ComponentClassNames } from '@marigold/system';
import { useClassNames, useSmallScreen } from '@marigold/system';
import type { SidebarCurrent } from './collection';
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

/** Level of the heading the nav sits under. Internal on purpose: the sidebar always sits under the page `h1`. */
export const SidebarHeadingLevelContext = createContext(1);

/**
 * Set by `Sidebar.Rail` around a section's nested `Sidebar.Nav` in the panel:
 * the rail's `current` and the panel title as the nav's accessible name. Props
 * set on the `Sidebar.Nav` itself win. Internal.
 */
export interface SidebarRailPanelContextValue {
  current?: SidebarCurrent;
  'aria-label'?: string;
}

export const SidebarRailPanelContext =
  createContext<SidebarRailPanelContextValue>({});

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

  // Cmd+B / Ctrl+B. Always toggles — even on a direct-link page (no panel),
  // collapse still narrows the rail to icons.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleSidebar]);

  const value = useMemo(
    () => ({ state, toggleSidebar, isMobile, classNames }),
    [state, toggleSidebar, isMobile, classNames]
  );

  return <SidebarContext value={value}>{children}</SidebarContext>;
};
