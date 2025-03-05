import { createContext, useContext } from 'react';
import { useIsSSR } from '@react-aria/ssr';

/**
 * Context to provide the container element for overlay components.
 * This is used by overlay components to append themselves to the correct container.
 * If no container is provided, it falls back to `document.body`.
 */
const OverlayContainerContext = createContext<string | HTMLElement | undefined>(
  undefined
);

export const OverlayContainerProvider = OverlayContainerContext.Provider;

export const usePortalContainer = () => {
  const portalContainer = useContext(OverlayContainerContext);

  if (useIsSSR()) return null;

  if (typeof portalContainer === 'string')
    return document.getElementById(portalContainer);

  return portalContainer || document.body;
};
