import { createContext, use } from 'react';

/**
 * Published as `true` by `Dialog.Header`, `Drawer.Header`, and `Tray.Header`.
 * Used by the corresponding `*.Description` components to warn in development
 * when a description is dropped directly at the overlay root — where it shares
 * `[grid-area:content]` with `*.Content` and the two will overlap.
 */
export const OverlayHeaderContext = createContext(false);

export const useIsInsideOverlayHeader = () => use(OverlayHeaderContext);
