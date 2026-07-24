import { use, useEffect } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components/Dialog';
import { useEffectEvent } from '@react-aria/utils';
import { DrawerNestingContext } from './Context';
import { registerActiveDrawer } from './drawerRegistry';

/**
 * Subscribes an open, non-nested Drawer to the single-slot registry. Nested
 * drawers skip registration because dismissing the parent would also unmount
 * their own trigger. `useEffectEvent` keeps the registered handler stable
 * while always invoking the latest `state.close`.
 */
export const useDrawerCoordination = () => {
  const state = use(OverlayTriggerStateContext);
  const isNested = use(DrawerNestingContext);
  const isOpen = state?.isOpen ?? false;
  const close = useEffectEvent(() => state?.close());

  useEffect(() => {
    if (!isOpen || isNested) return;
    return registerActiveDrawer(close);
  }, [isOpen, isNested]);
};
