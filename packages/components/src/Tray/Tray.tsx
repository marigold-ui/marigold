import {
  type ReactNode,
  use,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import {
  Dialog,
  OverlayTriggerStateContext,
} from 'react-aria-components/Dialog';
// `useIsHidden` and react-aria-components' `createHideableComponent` (used by
// `Select`/`ComboBox`/etc.) both read the SAME `HiddenContext`, defined in
// `react-aria/private/collections/Hidden`. They only share that context when
// `react-aria` resolves to a single version across the dependency tree. RAC pins
// `react-aria` exactly while `@react-aria/collections` uses a caret range, so a
// consumer's lockfile can install two `react-aria` generations -> two
// `HiddenContext` instances -> this guard reads a context the collection
// renderer never sets -> a duplicate (empty) tray modal leaks and both modals
// `inert` each other (DSTSUP-261). The DOM probe below covers that case.
//
// Why this guard exists at all: RAC's own `Popover`/`Menu` skip the hidden pass
// internally (via RAC's bundled `react-aria`, so they can never split) — which
// is why the desktop `Popover` path is immune. RAC's `Modal` (what `Tray` builds
// on) has no such guard, so we add one here. The durable fix is upstream — RAC
// guarding `Modal`'s hidden pass like `Popover`, or RAC exporting `useIsHidden`
// — after which this guard and the `@react-aria/collections` dependency can be
// dropped.
import { useIsHidden } from '@react-aria/collections';
import { cn, useClassNames } from '@marigold/system';
import { ResetButtonContext } from '../Button/ResetButtonContext';
import { ActionMenuContext } from '../Menu/ActionMenuContext';
import { useOverlayRootSlotProps } from '../utils/useOverlayRootSlotProps';
import { useSlot } from '../utils/useSlot';
import { TrayContext } from './Context';
import { TrayActions } from './TrayActions';
import { TrayContent } from './TrayContent';
import { TrayDescription } from './TrayDescription';
import { TrayHeader } from './TrayHeader';
import { TrayModal } from './TrayModal';
import { TrayTitle } from './TrayTitle';
import { TrayTrigger } from './TrayTrigger';

// Internal Usage Notes
// ---------------
// `<Tray>` is the mobile counterpart to `<Popover>`. Use it whenever an overlay
// needs to be presented as a bottom sheet on small screens, and switch to
// `<Popover>` on larger viewports.
//
// Typical consumers that follow this responsive pattern:
//   - `<Select>`             – renders its listbox inside a Tray on mobile
//   - `<Combobox>`           – uses `<MobileCombobox>` which wraps a Tray
//   - `<DatePicker>`         – shows the calendar in a Tray on mobile
//   - `<Menu>`               – renders menu items inside a Tray on mobile
//   - `<Autocomplete>`       – uses `<MobileAutocomplete>` which wraps a Tray
//
// When to use Tray vs. Popover:
//   Tray    → full-width bottom sheet, modal, blocks background interaction.
//             Best for touch devices / narrow viewports.
//   Popover → positioned relative to its trigger, non-modal by default.
//             Best for pointer devices / wide viewports.
//
// Components typically check viewport width and conditionally render either `<Tray>` or `<Popover>`.

// Props
// ---------------
export interface TrayProps extends Omit<
  RAC.DialogProps,
  'className' | 'style'
> {
  /**
   * Whether the overlay is open (controlled).
   * @default undefined
   */
  open?: boolean;

  /**
   * Handler called when the open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether clicking outside closes the tray.
   * @default true
   */
  dismissable?: boolean;

  /**
   * Whether pressing the escape key closes the tray.
   * @default true
   */
  keyboardDismissable?: boolean;

  /**
   * Children of the tray.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const Tray = ({
  open,
  onOpenChange,
  dismissable = true,
  keyboardDismissable = true,
  children,
  'aria-label': ariaLabel,
  ...props
}: TrayProps) => {
  const state = use(OverlayTriggerStateContext);
  const isHidden = useIsHidden();
  const titleId = useId();
  const probeRef = useRef<HTMLSpanElement>(null);
  const [isDetached, setIsDetached] = useState(false);
  const classNames = useClassNames({
    component: 'Tray',
  });
  // `hasTitle` gates the `aria-labelledby` wiring below. We intentionally do
  // not warn on a missing accessible name (unlike Card/Panel): a Tray runs
  // this hook while closed, before its title mounts, so the check would fire
  // spuriously. RAC's `<Dialog>` already warns about an unlabelled dialog.
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);

  const openState = open ?? state?.isOpen;

  const trayContextValue = useMemo(
    () => ({ classNames, titleId, hasTitle, titleSlotRef }),
    [classNames, titleId, hasTitle, titleSlotRef]
  );

  const { headingProps: rootHeadingProps, textProps } = useOverlayRootSlotProps(
    { classNames, titleId, titleSlotRef }
  );

  // Safety net for when `useIsHidden()` is blind to the hidden pass because of
  // a split `HiddenContext` (two react-aria generations, see above): the hidden
  // pass renders into a `<template>`, whose content lives in a detached
  // DocumentFragment, so a probe rendered in place is never connected to the
  // document. This resolves at mount — before the tray can ever open — so the
  // modal cannot portal out of a hidden tree even when the context guard fails.
  // Unlike the context guard, this holds regardless of how the consumer's
  // lockfile resolves react-aria.
  useLayoutEffect(() => {
    if (probeRef.current && !probeRef.current.isConnected) {
      setIsDetached(true);
    }
  }, []);

  // If we are in a hidden tree, we still need to preserve our children.
  // This is important for components like Select that need to maintain state context.
  if (isHidden || isDetached) {
    return <TrayContext value={trayContextValue}>{children}</TrayContext>;
  }

  return (
    <TrayContext value={trayContextValue}>
      <span hidden ref={probeRef} />
      <ResetButtonContext>
        <TrayModal
          open={openState}
          dismissable={dismissable}
          onOpenChange={onOpenChange}
          keyboardDismissable={keyboardDismissable}
        >
          <Dialog
            {...props}
            aria-label={ariaLabel}
            aria-labelledby={
              !ariaLabel && hasTitle ? titleId : props['aria-labelledby']
            }
            className={cn(
              "group/tray [grid-template-areas:'drag'_'title'_'content'_'actions']",
              classNames.container
            )}
          >
            <div className={cn('[grid-area:drag]', classNames.dragHandle)} />
            <Provider
              values={[
                [HeadingContext, rootHeadingProps],
                [TextContext, textProps],
                [ActionMenuContext, {}],
              ]}
            >
              {children}
            </Provider>
          </Dialog>
        </TrayModal>
      </ResetButtonContext>
    </TrayContext>
  );
};

Tray.Trigger = TrayTrigger;
Tray.Header = TrayHeader;
Tray.Title = TrayTitle;
Tray.Description = TrayDescription;
Tray.Content = TrayContent;
Tray.Actions = TrayActions;
