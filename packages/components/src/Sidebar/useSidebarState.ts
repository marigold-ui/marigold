import { useCallback, useEffect, useMemo, useState } from 'react';

export type SidebarState = 'expanded' | 'collapsed';

const COOKIE_NAME = 'marigold:sidebar:state';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const COOKIE_RE = new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`);

const readCookie = (): SidebarState | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(COOKIE_RE);
  return match ? (match[1] as SidebarState) : undefined;
};

const writeCookie = (state: SidebarState) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${state};path=/;max-age=${COOKIE_MAX_AGE}`;
};

export interface UseSidebarStateProps {
  /** Default open state for desktop sidebar. */
  defaultOpen?: boolean;
  /** Controlled open state for desktop sidebar. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
}

export interface SidebarStateResult {
  readonly state: SidebarState;
  toggleSidebar: () => void;
}

export const useSidebarState = (
  props: UseSidebarStateProps & { isMobile: boolean }
): SidebarStateResult => {
  const {
    defaultOpen = true,
    open: controlledOpen,
    onOpenChange,
    isMobile,
  } = props;

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

  return useMemo(() => ({ state, toggleSidebar }), [state, toggleSidebar]);
};
