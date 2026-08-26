import type { RefCallback } from 'react';
import { createContext, use } from 'react';

export interface TrayContextProps {
  classNames: {
    overlay: string;
    container: string;
    dragHandle: string;
    header: string;
    title: string;
    description: string;
    content: string;
    actions: string;
  };
  titleId?: string;
  hasTitle?: boolean;
  titleSlotRef?: RefCallback<Element>;
}

export const TrayContext = createContext<TrayContextProps>(
  null as unknown as TrayContextProps
);

export const useTrayContext = () => use(TrayContext);

/**
 * Marks the tray's scrollable body so `TrayModal` can tell a gesture that
 * starts in the content from one that starts on the tray's chrome (drag
 * handle, title, actions) — only the latter may start drag-to-dismiss
 * (DSTSUP-272).
 *
 * Internal on purpose: it is not re-exported from the package, so consumers
 * cannot use it as an opt-out marker. A public escape hatch (opting a custom
 * region out of dragging, or content back in) is a separate design decision —
 * see the note above `startsInTrayContent` in `TrayModal.tsx`.
 *
 * It lives here rather than in `TrayContent.tsx` because this module already
 * holds the contracts shared between the tray parts, and importing it from the
 * component that renders it would make `TrayModal` depend on `TrayContent`.
 */
export const TRAY_CONTENT_ATTR = 'data-tray-content';
