import { type ReactNode, useContext } from 'react';
import type RAC from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import { useIsHidden } from '@react-aria/collections';
import { cn, useClassNames } from '@marigold/system';
import { TrayContext } from './Context';
import { TrayActions } from './TrayActions';
import { TrayContent } from './TrayContent';
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
  ...props
}: TrayProps) => {
  const state = useContext(OverlayTriggerStateContext);
  const isHidden = useIsHidden();
  const classNames = useClassNames({
    component: 'Tray',
  });

  const openState = open ?? state?.isOpen;

  // If we are in a hidden tree, we still need to preserve our children.
  // This is important for components like Select that need to maintain state context.
  if (isHidden) {
    return (
      <TrayContext.Provider value={{ classNames }}>
        {children}
      </TrayContext.Provider>
    );
  }

  return (
    <TrayContext.Provider value={{ classNames }}>
      <TrayModal
        open={openState}
        dismissable={dismissable}
        onOpenChange={onOpenChange}
        keyboardDismissable={keyboardDismissable}
      >
        <Dialog
          {...props}
          className={cn(
            "group/tray [grid-template-areas:'drag'_'title'_'content'_'actions']",
            classNames.container
          )}
        >
          <div className={cn('[grid-area:drag]', classNames.dragHandle)} />
          {children}
        </Dialog>
      </TrayModal>
    </TrayContext.Provider>
  );
};

Tray.Trigger = TrayTrigger;
Tray.Title = TrayTitle;
Tray.Content = TrayContent;
Tray.Actions = TrayActions;
