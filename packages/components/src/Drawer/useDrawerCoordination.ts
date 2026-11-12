import { use, useEffect } from 'react';
import { useEffectEvent } from '@react-aria/utils';
import type { OverlayTriggerState } from '@react-stately/overlays';
import { DrawerNestingContext } from './Context';
import { registerActiveDrawer } from './drawerRegistry';

/**
 * Subscribes an open, non-nested Drawer to the single-slot registry. Nested
 * drawers skip registration because dismissing the parent would also unmount
 * their own trigger. `useEffectEvent` keeps the registered handler stable
 * while always invoking the latest `state.close`.
 */
export const useDrawerCoordination = (state: OverlayTriggerState) => {
  const isNested = use(DrawerNestingContext);
  const isOpen = state.isOpen;
  const close = useEffectEvent(() => state.close());

  useEffect(() => {
    if (!isOpen || isNested) return;
    return registerActiveDrawer(close);
  }, [isOpen, isNested]);
};
