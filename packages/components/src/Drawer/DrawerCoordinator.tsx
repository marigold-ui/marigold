import { use, useEffect } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';
import { useEffectEvent } from '@react-aria/utils';
import { registerActiveDrawer } from './drawerRegistry';

/**
 * Renderless coordinator mounted inside `<Dialog>` so it reads the active
 * `OverlayTriggerStateContext` (provided by `NonModal` on desktop and
 * `ModalOverlay`/`DialogTrigger` on mobile). `useEffectEvent` keeps the
 * registered handler stable while always invoking the latest `state.close`.
 */
export const DrawerCoordinator = () => {
  const state = use(OverlayTriggerStateContext);
  const isOpen = state?.isOpen ?? false;
  const close = useEffectEvent(() => state?.close());

  useEffect(() => {
    if (!isOpen) return;
    return registerActiveDrawer(close);
  }, [isOpen]);

  return null;
};
