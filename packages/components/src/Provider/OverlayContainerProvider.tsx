import { createContext, useContext } from 'react';

import { useIsSSR } from '@react-aria/ssr';

const OverlayContainerContext = createContext<string | undefined>(undefined);

export const OverlayContainerProvider = OverlayContainerContext.Provider;

export const usePortalContainer = () => {
  const portalContainer = useContext(OverlayContainerContext);
  const isSSR = useIsSSR();

  const portal = isSSR
    ? null
    : portalContainer
      ? document.getElementById(portalContainer)
      : document.body;

  return portal;
};
