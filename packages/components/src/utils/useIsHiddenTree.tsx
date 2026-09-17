import { type ReactElement, useLayoutEffect, useRef, useState } from 'react';
// `useIsHidden` and react-aria-components' `createHideableComponent` (used by
// `Select`/`ComboBox`/etc.) both read the SAME `HiddenContext`, defined in
// `react-aria/private/collections/Hidden`. They only share that context when
// `react-aria` resolves to a single version across the dependency tree. RAC pins
// `react-aria` exactly while `@react-aria/collections` uses a caret range, so a
// consumer's lockfile can install two `react-aria` generations -> two
// `HiddenContext` instances -> this guard reads a context the collection
// renderer never sets -> a duplicate (empty) tray modal leaks and both modals
// `inert` each other (DSTSUP-261). The DOM probe below covers that case.
import { useIsHidden } from '@react-aria/collections';

/**
 * Whether we are inside a collection's hidden pass, plus the probe element the
 * caller has to render in the visible branch.
 *
 * Collection components (`Select`, `ComboBox`, `Autocomplete`, ...) render
 * their children twice: once hidden, to build the collection, then for real.
 * Overlay chrome must stand aside during the hidden pass so it does not mount
 * a second time, while still letting the children through so the collection
 * can see the items.
 *
 * The probe is the safety net for when `useIsHidden()` is blind to the hidden
 * pass because of a split `HiddenContext` (two react-aria generations, see
 * above): the hidden pass renders into a `<template>`, whose content lives in
 * a detached DocumentFragment, so a probe rendered in place is never connected
 * to the document. This resolves at mount, before any overlay can open, so
 * chrome cannot portal out of a hidden tree even when the context guard fails.
 * Unlike the context guard, this holds regardless of how the consumer's
 * lockfile resolves react-aria.
 *
 * The durable fix is upstream: RAC guarding `Modal` and `DialogTrigger`'s
 * hidden pass the way it already guards `Popover`/`Menu` (which use RAC's own
 * bundled `react-aria`, so they can never split), or RAC exporting
 * `useIsHidden`. After that, this hook and the `@react-aria/collections`
 * dependency can both be dropped.
 */
export const useIsHiddenTree = (): {
  isHidden: boolean;
  probe: ReactElement;
} => {
  const isHidden = useIsHidden();
  const probeRef = useRef<HTMLSpanElement>(null);
  const [isDetached, setIsDetached] = useState(false);

  useLayoutEffect(() => {
    if (probeRef.current && !probeRef.current.isConnected) {
      setIsDetached(true);
    }
  }, []);

  return {
    isHidden: isHidden || isDetached,
    probe: <span hidden ref={probeRef} />,
  };
};
