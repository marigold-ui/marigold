import { type ReactNode, type Ref, useId, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ActionMenuContext } from '../Menu/ActionMenuContext';
import { Sheet } from '../Overlay/Sheet';
import { useIsHiddenTree } from '../utils/useIsHiddenTree';
import { useOverlayRootSlotProps } from '../utils/useOverlayRootSlotProps';
import { useSlot } from '../utils/useSlot';
import { TrayContext } from './Context';
import { TrayActions } from './TrayActions';
import { TrayContent } from './TrayContent';
import { TrayDescription } from './TrayDescription';
import { TrayHeader } from './TrayHeader';
import { TrayTitle } from './TrayTitle';
import { TrayTrigger } from './TrayTrigger';

// Internal Usage Notes
// ---------------
// `<Tray>` is the mobile counterpart to `<Popover>`. Use it whenever an overlay
// needs to be presented as a bottom sheet on small screens, and switch to
// `<Popover>` on larger viewports.
//
// Consumers: Select, ComboBox, Autocomplete, TagField, DatePicker,
// DateRangePicker, Calendar presets, Menu and ActionMenu.
//
// When to use Tray vs. Popover:
//   Tray    → full-width bottom sheet, modal, blocks background interaction,
//             swipe down to dismiss. Best for touch devices / narrow viewports.
//   Popover → positioned relative to its trigger, non-modal by default.
//             Best for pointer devices / wide viewports.
//
// Components typically check viewport width and conditionally render either `<Tray>` or `<Popover>`.
//
// The shell is the internal `<Sheet>` (ADR-0007). Tray owns its parts, grid,
// title wiring and the hidden collection pass.

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
   * Whether swiping down, pressing Escape and clicking outside close the tray.
   * @default true
   */
  dismissable?: boolean;

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
  children,
  'aria-label': ariaLabel,
  ref,
  ...props
}: TrayProps) => {
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
      {/* Undefined `open` lets every close reach `Tray.Trigger`'s state. */}
      <Sheet
        {...props}
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        dismissable={dismissable}
        aria-label={ariaLabel}
        aria-labelledby={
          !ariaLabel && hasTitle ? titleId : props['aria-labelledby']
        }
      >
        <div
          data-tray
          className={cn(
            "group/tray min-h-0 [grid-template-areas:'drag'_'title'_'content'_'actions']",
            classNames.container
          )}
        >
          {/* Visual cue only, the whole sheet is swipeable. */}
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
        </div>
      </Sheet>
    </TrayContext>
  );
};

Tray.Trigger = TrayTrigger;
Tray.Header = TrayHeader;
Tray.Title = TrayTitle;
Tray.Description = TrayDescription;
Tray.Content = TrayContent;
Tray.Actions = TrayActions;
