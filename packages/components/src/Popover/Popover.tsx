import type { ReactNode, RefCallback } from 'react';
import { use, useId, useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { Dialog } from 'react-aria-components/Dialog';
import { FocusScope } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { ComponentClassNames } from '@marigold/system';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import type { PopoverProps as OverlayPopoverProps } from '../Overlay/Popover';
import { Popover as OverlayPopover } from '../Overlay/Popover';
import { TRAY_CONTENT_ATTR, useTrayContext } from '../Tray/Context';
import { Tray } from '../Tray/Tray';
import { intlMessages } from '../intl/messages';
import { useOverlayHeaderSlotProps } from '../utils/useOverlayHeaderSlotProps';
import { useSlot } from '../utils/useSlot';
import { PopoverContext, PopoverTriggerContext } from './Context';
import { PopoverContent } from './PopoverContent';
import { PopoverSearch, PopoverSearchScope } from './PopoverSearch';
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
   * technology, locks scrolling and keeps focus inside. A non-modal one lets
   * focus leave and keeps the page interactive. React Aria advises against it
   * when the popover holds focusable controls, because screen reader users can
   * lose track of it.
   *
   * On small screens the popover renders as a tray, which is always modal.
   * @default false
   */
  nonModal?: boolean;

  /**
   * Width of the popover on larger screens.
   * @default 'medium'
   */
  width?: 'small' | 'medium' | 'large';

  /**
   * Content of the popover: an optional `<Title>` and `<Description>`, an
   * optional `<Popover.Search>`, and the body in `<Popover.Content>`, all as
   * siblings. Without a `<Popover.Content>`, all children are laid out as the
   * body.
   */
  children?: ReactNode;
}

interface PopoverComponent {
  (props: PopoverProps): ReactNode;
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
  Search: typeof PopoverSearch;
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
  width,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
}: Pick<PopoverProps, 'aria-label' | 'aria-labelledby' | 'children'> & {
  classNames: ComponentClassNames<'Popover'>;
  width: NonNullable<PopoverProps['width']>;
}) => {
  const titleId = useId();
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);

  return (
    <Dialog
      aria-label={ariaLabel}
      aria-labelledby={!ariaLabel && hasTitle ? titleId : ariaLabelledby}
      // Inherits the max height React Aria computes for the popover, so a
      // long body scrolls inside instead of being clipped by the surface.
      className={cn('max-h-[inherit]', classNames.body)}
      {...{ [`data-${width}`]: true }}
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
  width = 'medium',
  placement = 'bottom',
  shouldCloseOnInteractOutside,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}: PopoverProps) => {
  const { dismissable, keyboardDismissable } = use(PopoverTriggerContext);
  const classNames = useClassNames({ component: 'Popover' });
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  if (isSmallScreen) {
    return (
      <Tray
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        dismissable={dismissable}
        keyboardDismissable={keyboardDismissable}
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
      width={width}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
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

PopoverBase.Trigger = PopoverTrigger;
PopoverBase.Content = PopoverContent;
PopoverBase.Search = PopoverSearch;

export const Popover: PopoverComponent = PopoverBase;
