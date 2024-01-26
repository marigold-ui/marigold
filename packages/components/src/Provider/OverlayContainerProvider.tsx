import { createContext, useContext } from 'react';

import { useIsSSR } from '@react-aria/ssr';

// needs an id for the portal container, it will be overgiven as string,
// if there is no the body is used
const OverlayContainerContext = createContext<string | undefined>(undefined);

export const OverlayContainerProvider = OverlayContainerContext.Provider;

export const usePortalContainer = () => {
  const portalContainer = useContext(OverlayContainerContext);
  const isSSR = useIsSSR();

  console.log(portalContainer);
  const portal = isSSR
    ? null
    : portalContainer
      ? document.getElementById(portalContainer)
      : document.body;

  return portal;
};
