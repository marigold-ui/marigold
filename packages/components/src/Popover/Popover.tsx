import type { ReactNode, Ref, RefCallback } from 'react';
import { use, useId, useMemo, useRef } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { Dialog } from 'react-aria-components/Dialog';
import { FocusScope } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { mergeRefs } from '@react-aria/utils';
import type { ComponentClassNames } from '@marigold/system';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import type { PopoverProps as OverlayPopoverProps } from '../Overlay/Popover';
import { Popover as OverlayPopover } from '../Overlay/Popover';
import { useLightDismiss } from '../Overlay/useLightDismiss';
import { TRAY_CONTENT_ATTR, useTrayContext } from '../Tray/Context';
import { Tray } from '../Tray/Tray';
import { intlMessages } from '../intl/messages';
import { useOverlayHeaderSlotProps } from '../utils/useOverlayHeaderSlotProps';
import { useSlot } from '../utils/useSlot';
import { PopoverContext, PopoverTriggerContext } from './Context';
import { PopoverContent } from './PopoverContent';
import { PopoverSearch } from './PopoverSearch';
import { PopoverSearchScope } from './PopoverSearchScope';
import { PopoverTrigger } from './PopoverTrigger';

// Props
// ---------------
// RAC's popover API minus what the compound owns or what is internal: the
// open state and dismiss behaviour live on `<Popover.Trigger>`, `isNonModal`
// becomes `nonModal`, and the enter/exit flags are RAC animation internals.
type RemovedProps =
  | 'open'
  | 'keyboardDismissDisabled'
  | 'matchTriggerWidth'
  | 'isNonModal'
  | 'isEntering'
  | 'isExiting'
  | 'trigger'
  | 'UNSTABLE_portalContainer'
  | 'render'
  | 'children';

export interface PopoverProps extends Omit<OverlayPopoverProps, RemovedProps> {
  /**
   * Whether the popover is non-modal, React Aria's `isNonModal`. A modal
   * popover (the default) hides the rest of the page from assistive
   * technology, locks scrolling and keeps focus inside, while the page stays
   * visible and a press outside or Escape closes it. A non-modal one keeps
   * the page interactive: it closes when the user presses outside of it,
   * moves focus elsewhere, presses Escape or scrolls the page. Use it only for
   * panels without focusable controls, because screen reader users can lose
   * track of a non-modal panel.
   *
   * On small screens the popover renders as a tray, which is always modal.
   * @default false
   */
  nonModal?: boolean;

  /**
   * Width of the popover on larger screens. `fit` sizes it to its content,
   * up to the `large` width. On small screens the tray spans the screen.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'fit' | (string & {});

  /**
   * Content of the popover: an optional `<Title>` and `<Description>`, an
   * optional `<Popover.Search>`, and the body in `<Popover.Content>`, all as
   * siblings. Without a `<Popover.Content>`, all children are laid out as the
   * body.
   */
  children?: ReactNode;

  /**
   * Ref to the popover's dialog element (the tray's on small screens).
   */
  ref?: Ref<HTMLElement>;
}

// Helpers
// ---------------
/**
 * Hands the theme classes, the `<Title>`/`<Description>` slots and the search
 * scope to the popover's parts. A `<Title>` gets the id that labels the
 * popover and reports its presence through `titleSlotRef`.
 */
const PopoverParts = ({
  classNames,
  isTray,
  titleId,
  titleSlotRef,
  children,
}: {
  classNames: ComponentClassNames<'Popover'>;
  isTray: boolean;
  titleId?: string;
  titleSlotRef?: RefCallback<Element>;
  children?: ReactNode;
}) => {
  const { headingProps, textProps } = useOverlayHeaderSlotProps({
    classNames,
    titleId,
    titleSlotRef,
  });
  const ctx = useMemo(() => ({ classNames, isTray }), [classNames, isTray]);

  return (
    <PopoverContext value={ctx}>
      <Provider
        values={[
          [HeadingContext, headingProps],
          [TextContext, textProps],
        ]}
      >
        <PopoverSearchScope>{children}</PopoverSearchScope>
      </Provider>
    </PopoverContext>
  );
};

/**
 * Body of the small-screen branch. Rendered inside `<Tray>` so it can read the
 * tray's title wiring: a `<Title>` here becomes the tray's `aria-labelledby`.
 * It spans the tray's title and content rows, so a `<Title>` stays on top and
 * only `<Popover.Content>` scrolls, same as on larger screens.
 */
const PopoverTrayBody = ({
  classNames,
  children,
}: {
  classNames: ComponentClassNames<'Popover'>;
  children?: ReactNode;
}) => {
  const { titleId, titleSlotRef } = useTrayContext();

  return (
    <div
      // Content gestures scroll instead of dragging the tray (DSTSUP-272).
      {...{ [TRAY_CONTENT_ATTR]: true }}
      data-tray
      className={cn('[grid-row:title/content]', classNames.body)}
    >
      <PopoverParts
        classNames={classNames}
        isTray
        titleId={titleId}
        titleSlotRef={titleSlotRef}
      >
        {children}
      </PopoverParts>
    </div>
  );
};

/**
 * Body of the anchored popover. Rendered only while open, so the title slot
 * is detected when the popover opens rather than while it is closed.
 */
const PopoverDialog = ({
  classNames,
  lightDismiss,
  shouldCloseOnInteractOutside,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
  ref,
}: Pick<
  PopoverProps,
  | 'aria-label'
  | 'aria-labelledby'
  | 'children'
  | 'ref'
  | 'shouldCloseOnInteractOutside'
> & {
  classNames: ComponentClassNames<'Popover'>;
  /** Close on a press outside, which React Aria skips for non-modal ones. */
  lightDismiss: boolean;
}) => {
  const titleId = useId();
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);
  const dialogRef = useRef<HTMLElement>(null);
  const mergedRef = useMemo(() => mergeRefs(ref, dialogRef), [ref]);
  const { lightDismissProps } = useLightDismiss(dialogRef, {
    isDisabled: !lightDismiss,
    shouldCloseOnInteractOutside,
  });

  return (
    <Dialog
      {...lightDismissProps}
      ref={mergedRef}
      aria-label={ariaLabel}
      aria-labelledby={!ariaLabel && hasTitle ? titleId : ariaLabelledby}
      // Inherits the max height React Aria computes for the popover, so a
      // long body scrolls inside instead of being clipped by the surface.
      className={cn('max-h-[inherit]', classNames.body)}
    >
      <PopoverParts
        classNames={classNames}
        isTray={false}
        titleId={titleId}
        titleSlotRef={titleSlotRef}
      >
        {children}
      </PopoverParts>
    </Dialog>
  );
};

// Component
// ---------------
const PopoverBase = ({
  nonModal = false,
  size = 'medium',
  placement = 'bottom',
  shouldCloseOnInteractOutside,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ref,
  ...props
}: PopoverProps) => {
  const { dismissable, keyboardDismissable } = use(PopoverTriggerContext);
  const isSmallScreen = useSmallScreen();
  // The tray spans the screen, so `size` only applies to the anchored popover.
  const classNames = useClassNames({
    component: 'Popover',
    size: isSmallScreen ? undefined : size,
  });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  if (isSmallScreen) {
    return (
      <Tray
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        dismissable={dismissable}
        keyboardDismissable={keyboardDismissable}
        ref={ref}
      >
        <PopoverTrayBody classNames={classNames}>{children}</PopoverTrayBody>
        <Tray.Actions>
          <Button slot="close">{stringFormatter.format('close')}</Button>
        </Tray.Actions>
      </Tray>
    );
  }

  const dialog = (
    <PopoverDialog
      classNames={classNames}
      lightDismiss={nonModal && dismissable}
      shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      ref={ref}
    >
      {children}
    </PopoverDialog>
  );

  return (
    <OverlayPopover
      {...props}
      placement={placement}
      matchTriggerWidth={false}
      isNonModal={nonModal}
      keyboardDismissDisabled={!keyboardDismissable}
      shouldCloseOnInteractOutside={
        dismissable ? shouldCloseOnInteractOutside : () => false
      }
    >
      {/* React Aria only contains focus when the popover is its own dialog.
          Ours nests a `<Dialog>` for the close slot and labelling, so a modal
          popover contains focus here. */}
      {nonModal ? dialog : <FocusScope contain>{dialog}</FocusScope>}
    </OverlayPopover>
  );
};

export const Popover = Object.assign(PopoverBase, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Search: PopoverSearch,
});
