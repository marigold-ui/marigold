import { type ReactElement, useLayoutEffect, useRef, useState } from 'react';
// Shares `HiddenContext` with RAC's `createHideableComponent` only while
// `react-aria` resolves to one version. RAC pins it exactly, `@react-aria/collections`
// uses a caret, so a lockfile can install two generations: the guard then reads a
// context the collection renderer never sets, a duplicate empty tray modal leaks,
// and both modals `inert` each other (DSTSUP-261). The probe below covers that.
import { useIsHidden } from '@react-aria/collections';

/**
 * Whether we are inside a collection's hidden pass, plus the probe the caller
 * has to render in the visible branch.
 *
 * Collection components (`Select`, `ComboBox`, ...) render their children
 * twice: once hidden to build the collection, then for real. Overlay chrome has
 * to stand aside during the hidden pass without blocking the children.
 *
 * The probe covers the split `HiddenContext` above: the hidden pass renders
 * into a `<template>`, a detached DocumentFragment, so a probe rendered in
 * place is never connected. It resolves at mount, before any overlay can open,
 * and holds regardless of how the consumer's lockfile resolves react-aria.
 *
 * Drop this hook and the `@react-aria/collections` dependency once RAC guards
 * `Modal`/`DialogTrigger`'s hidden pass the way it already guards
 * `Popover`/`Menu`, or exports `useIsHidden`.
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
