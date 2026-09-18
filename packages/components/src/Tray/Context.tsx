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
 * Marks the tray's scrollable body so `TrayModal` can tell content gestures
 * from chrome gestures (DSTSUP-272). Internal, not an opt-out marker. Lives
 * here, not `TrayContent.tsx`, so `TrayModal` doesn't depend on it.
 */
export const TRAY_CONTENT_ATTR = 'data-tray-content';
