import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { ComponentClassNames } from '@marigold/system';
import { useClassNames, useSmallScreen } from '@marigold/system';

export type SidebarState = 'expanded' | 'collapsed';

export interface SidebarContextValue {
  state: SidebarState;
  toggleSidebar: () => void;
  isMobile: boolean;
  classNames: ComponentClassNames<'Sidebar'>;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = (): SidebarContextValue => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within a <Sidebar.Provider>.');
  }
  return ctx;
};

const COOKIE_NAME = 'marigold:sidebar:state';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const readCookie = (): SidebarState | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`)
  );
  return match ? (match[1] as SidebarState) : undefined;
};

const writeCookie = (state: SidebarState) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${state};path=/;max-age=${COOKIE_MAX_AGE}`;
};

export interface SidebarProviderProps {
  children: ReactNode;
  /** Default open state for desktop sidebar. */
  defaultOpen?: boolean;
  /** Controlled open state for desktop sidebar. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  variant?: string;
  size?: string;
}

export const SidebarProvider = ({
  children,
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  variant,
  size,
}: SidebarProviderProps) => {
  const isMobile = useSmallScreen();
  const classNames = useClassNames({ component: 'Sidebar', variant, size });

  // Desktop state (cookie-backed)
  const [_open, _setOpen] = useState(() => {
    const cookie = readCookie();
    if (cookie) return cookie === 'expanded';
    return defaultOpen;
  });

  // Mobile state (always starts closed)
  const [_openMobile, _setOpenMobile] = useState(false);

  const isOpen = controlledOpen ?? (isMobile ? _openMobile : _open);

  const toggleSidebar = useCallback(() => {
    const newOpen = !isOpen;

    if (onOpenChange) {
      onOpenChange(newOpen);
      return;
    }

    if (isMobile) {
      _setOpenMobile(prev => !prev);
    } else {
      writeCookie(newOpen ? 'expanded' : 'collapsed');
      _setOpen(newOpen);
    }
  }, [isOpen, isMobile, onOpenChange]);

  // Keyboard shortcut: Cmd+B / Ctrl+B
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

  const state: SidebarState = isOpen ? 'expanded' : 'collapsed';

  const value = useMemo(
    () => ({
      state,
      toggleSidebar,
      isMobile,
      classNames,
    }),
    [state, toggleSidebar, isMobile, classNames]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
