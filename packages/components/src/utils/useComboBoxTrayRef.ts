import { type RefObject, use, useLayoutEffect } from 'react';
import { PopoverContext } from 'react-aria-components/Popover';
import { useUNSAFE_PortalContext } from '@react-aria/overlays';

/**
 * Bridges RAC's `popoverRef` to a `Tray` on the mobile ComboBox/Autocomplete path.
 *
 * `useComboBox` keeps the combobox surface reachable for screen readers with
 * `ariaHideOutside([inputRef.current, popoverRef.current].filter(Boolean))`,
 * which hides everything *outside* the elements it is handed. On mobile we
 * render a `<Tray>` rather than RAC's `<Popover>`, so nothing claims
 * `PopoverContext`, and the tray portals in a later commit than the one that
 * flips `isOpen`, so its input is not mounted either. Both refs are `null`, the
 * list collapses to `[]`, and the whole tray subtree drops out of the
 * accessibility tree. The tray does not need that pass anyway, since
 * `useModalOverlay` runs its own `ariaHideOutside` with `shouldUseInert`.
 *
 * So `popoverRef` always points at whatever stands in for the combobox surface:
 * the dialog element while the tray is open (what RAC expects, and what makes
 * its blur handling work), the portal container while closed, so the hide pass
 * keeps the container the tray appears in visible.
 *
 * Caveat on that blur path: it asks `nodeContains(popoverRef.current,
 * relatedTarget)`, so while the closed-state fallback is armed it answers
 * `true` for *any* target and `onBlur` is skipped. Harmless while the combobox
 * `Input` only exists inside the tray. Move it out of the tray subtree and blur
 * handling goes missing silently.
 */
export const useComboBoxTrayRef = ():
  RefObject<HTMLElement | null> | undefined => {
  const popoverContext = use(PopoverContext);
  const portalContext = useUNSAFE_PortalContext();

  // `ContextValue` also covers slotted values, which never carry a ref. RAC's
  // ComboBox provides a plain props object.
  const popoverRef =
    popoverContext && 'ref' in popoverContext
      ? (popoverContext.ref as RefObject<HTMLElement | null>)
      : undefined;

  // Deliberately not `[]`: React detaches the dialog ref before layout effects
  // run, so this re-arms the fallback on every close and a reopened tray is
  // never measured against a stale element. It also has to run before
  // `useComboBox`'s hide effect, a passive effect in an ancestor.
  useLayoutEffect(() => {
    if (popoverRef && !popoverRef.current) {
      // Writing to RAC's ref is the documented interop seam here, not
      // accidental shared mutation.
      // eslint-disable-next-line react-hooks/immutability
      popoverRef.current = portalContext?.getContainer?.() ?? document.body;
    }
  });

  return popoverRef;
};
