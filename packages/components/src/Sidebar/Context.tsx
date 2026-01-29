import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { useSmallScreen } from '@marigold/system';

// Types
// ---------------
export type SidebarState = 'expanded' | 'collapsed';

export interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  variant?: string;
  size?: string;
  side: 'left' | 'right';
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

// Hook
// ---------------
export const useSidebar = (): SidebarContextValue => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within a <Sidebar.Provider>.');
  }
  return ctx;
};

// Cookie helpers
// ---------------
const COOKIE_NAME = 'sidebar:state';
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

// Provider
// ---------------
export interface SidebarProviderProps {
  children: ReactNode;
  /** Default open state for desktop sidebar. */
  defaultOpen?: boolean;
  /** Controlled open state for desktop sidebar. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Side the sidebar is placed on. */
  side?: 'left' | 'right';
  variant?: string;
  size?: string;
}

export const SidebarProvider = ({
  children,
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  side = 'left',
  variant,
  size,
}: SidebarProviderProps) => {
  const isMobile = useSmallScreen();

  const [_open, _setOpen] = useState(() => {
    const cookie = readCookie();
    if (cookie) return cookie === 'expanded';
    return defaultOpen;
  });

  const open = controlledOpen ?? _open;

  const setOpen = useCallback(
    (value: boolean) => {
      const newState: SidebarState = value ? 'expanded' : 'collapsed';
      writeCookie(newState);
      if (onOpenChange) {
        onOpenChange(value);
      } else {
        _setOpen(value);
      }
    },
    [onOpenChange]
  );

  const [openMobile, setOpenMobile] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile(prev => !prev);
    } else {
      setOpen(!open);
    }
  }, [isMobile, open, setOpen]);

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

  const state: SidebarState = open ? 'expanded' : 'collapsed';

  const value = useMemo(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      variant,
      size,
      side,
    }),
    [
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      variant,
      size,
      side,
    ]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
