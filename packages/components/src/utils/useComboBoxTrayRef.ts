import { type RefObject, use, useLayoutEffect } from 'react';
import { PopoverContext } from 'react-aria-components/Popover';
import { useUNSAFE_PortalContext } from '@react-aria/overlays';

/**
 * Bridges RAC's `popoverRef` to a `Tray` on the mobile ComboBox/Autocomplete path.
 *
 * When the listbox opens, `useComboBox` keeps the combobox surface reachable for
 * screen readers with
 *
 * ```js
 * ariaHideOutside([inputRef.current, popoverRef.current].filter(el => el != null))
 * ```
 *
 * `ariaHideOutside` hides everything *outside* the elements it is handed, so an
 * empty list hides the whole document — including the overlay itself.
 *
 * On mobile we render a `<Tray>` instead of RAC's `<Popover>`, so nothing claims
 * `PopoverContext` and `popoverRef.current` stays `null`. RAC's `<Popover>` would
 * mount in the same commit that flips `isOpen`; the tray instead portals in a
 * later commit, so the tray's input is not mounted yet either and
 * `inputRef.current` is `null` too. The list collapses to `[]` and the entire tray
 * subtree (dialog + input + listbox) is dropped from the accessibility tree.
 *
 * The tray does not need that hide pass: it builds on RAC's `Modal`, and
 * `useModalOverlay` runs its own `ariaHideOutside(..., {shouldUseInert: true})`
 * which isolates the background correctly. What we have to prevent is the ComboBox
 * pass hiding the tray itself.
 *
 * So `popoverRef` always points at whatever currently stands in for the combobox
 * surface. Returned to the `Tray`, it holds the dialog element while the tray is
 * open — what RAC expects, and what makes `useComboBox`'s blur handling work
 * again (it asks whether focus moved into `popoverRef.current` before closing,
 * always false with a `null` ref). While the tray is closed it falls back to the
 * container the tray will portal into, so the hide pass keeps that container —
 * and therefore the tray appearing inside it — visible.
 */
export const useComboBoxTrayRef = ():
  | RefObject<HTMLElement | null>
  | undefined => {
  const popoverContext = use(PopoverContext);
  const portalContext = useUNSAFE_PortalContext();

  // `ContextValue` also covers slotted values, which never carry a ref. RAC's
  // ComboBox provides a plain props object, so only that shape is relevant.
  const popoverRef =
    popoverContext && 'ref' in popoverContext
      ? (popoverContext.ref as RefObject<HTMLElement | null>)
      : undefined;

  // Deliberately not `[]`: React detaches the dialog ref before layout effects
  // run, so this re-arms the fallback on every close and a reopened tray is
  // never measured against a stale element. It also has to run before
  // `useComboBox`'s hide effect, which is a passive effect in an ancestor.
  //
  useLayoutEffect(() => {
    if (popoverRef && !popoverRef.current) {
      // `popoverRef` is owned by RAC, so `react-hooks/immutability` cannot tell
      // that writing to it is the whole point here — this is the documented
      // interop seam with RAC's ComboBox, not accidental shared mutation.
      // eslint-disable-next-line react-hooks/immutability
      popoverRef.current = portalContext?.getContainer?.() ?? document.body;
    }
  });

  return popoverRef;
};
