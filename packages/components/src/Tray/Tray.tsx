import { type ReactNode, type Ref, use, useId, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import {
  Dialog,
  OverlayTriggerStateContext,
} from 'react-aria-components/Dialog';
import { cn, useClassNames } from '@marigold/system';
import { ResetButtonContext } from '../Button/ResetButtonContext';
import { ActionMenuContext } from '../Menu/ActionMenuContext';
import { useIsHiddenTree } from '../utils/useIsHiddenTree';
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

  /**
   * Ref to the tray's dialog element.
   */
  ref?: Ref<HTMLElement>;
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
  ref,
  ...props
}: TrayProps) => {
  const state = use(OverlayTriggerStateContext);
  const { isHidden, probe } = useIsHiddenTree();
  const titleId = useId();
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

  // If we are in a hidden tree, we still need to preserve our children.
  // This is important for components like Select that need to maintain state context.
  if (isHidden) {
    return <TrayContext value={trayContextValue}>{children}</TrayContext>;
  }

  return (
    <TrayContext value={trayContextValue}>
      {probe}
      <ResetButtonContext>
        <TrayModal
          open={openState}
          dismissable={dismissable}
          onOpenChange={onOpenChange}
          keyboardDismissable={keyboardDismissable}
        >
          <Dialog
            {...props}
            ref={ref}
            aria-label={ariaLabel}
            aria-labelledby={
              !ariaLabel && hasTitle ? titleId : props['aria-labelledby']
            }
            className={cn(
              "group/tray [grid-template-areas:'drag'_'title'_'content'_'actions']",
              classNames.container
            )}
          >
            {/* Chrome owns vertical gestures now that motion's listener is
                disarmed. See `TrayModal.tsx`. */}
            <div
              className={cn(
                'touch-none select-none [grid-area:drag]',
                classNames.dragHandle
              )}
            />
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
