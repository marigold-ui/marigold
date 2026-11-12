import type { RefCallback } from 'react';
import { createContext, use } from 'react';

export interface TrayContextProps {
  classNames: {
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
 * Pins tray content at its measured height so the tray does not shrink while
 * the content changes, capped so the tray (content plus `chrome`, the title
 * and actions around it) still fits the sheet's `--sheet-available` height.
 */
export const pinTrayContentHeight = (
  node: HTMLElement,
  pinned: number,
  chrome: number
) => {
  node.style.minHeight = `min(${pinned}px, calc(var(--sheet-available) - ${chrome}px))`;
};
