import type { ReactNode } from 'react';
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
import { useSlot } from '../utils/useSlot';
import { PopoverContext, PopoverTriggerContext } from './Context';
import { PopoverContent } from './PopoverContent';
import { PopoverSearch, PopoverSearchScope } from './PopoverSearch';
import { PopoverTrigger } from './PopoverTrigger';

// Props
// ---------------
// RAC's popover API minus what the compound owns or what is internal: the
// open state and dismiss behaviour live on `<Popover.Trigger>`, `isNonModal`
// becomes `modal`, and the enter/exit flags are RAC animation internals.
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
   * How strongly the popover takes over the page, following React Aria.
   *
   * - `true`: modal. The rest of the page is hidden from assistive technology,
   *   scrolling is locked and focus stays inside.
   * - `'trap-focus'`: focus stays inside, but the page keeps scrolling and stays
   *   visible to assistive technology.
   * - `false`: non-modal. Focus can leave and the page stays interactive. React
   *   Aria advises against this when the popover holds focusable controls,
   *   because screen reader users can lose track of it.
   *
   * On small screens the popover renders as a tray, which is always modal.
   * @default true
   */
  modal?: boolean | 'trap-focus';

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
 * Slot config for the shared `<Title>`/`<Description>` primitives. A `<Title>`
 * gets the id that labels the popover and reports its presence through
 * `titleSlotRef`. `data-slot` lets the theme lay out the parts.
 */
const useSlotProps = (
  classNames: ComponentClassNames<'Popover'>,
  titleId: string | undefined,
  titleSlotRef: ((el: Element | null) => void) | undefined
) => {
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: classNames.title,
          'data-slot': 'title',
          level: 2,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.title, titleId, titleSlotRef]
  );
  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: classNames.description,
          'data-slot': 'description',
          elementType: 'p' as const,
        },
      },
    }),
    [classNames.description]
  );

  return { headingProps, textProps };
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
  const { headingProps, textProps } = useSlotProps(
    classNames,
    titleId,
    titleSlotRef
  );
  const ctx = useMemo(() => ({ classNames, isTray: true }), [classNames]);

  return (
    <div
      // Content gestures scroll instead of dragging the tray (DSTSUP-272).
      {...{ [TRAY_CONTENT_ATTR]: true }}
      className={cn('[grid-row:title/content]', classNames.body)}
    >
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
    </div>
  );
};

// Component
// ---------------
const PopoverBase = ({
  modal = true,
  width = 'medium',
  placement = 'bottom',
  shouldCloseOnInteractOutside,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}: PopoverProps) => {
  const trigger = use(PopoverTriggerContext);
  const dismissable = trigger?.dismissable ?? true;
  const keyboardDismissable = trigger?.keyboardDismissable ?? true;
  const classNames = useClassNames({ component: 'Popover' });
  const isSmallScreen = useSmallScreen();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const titleId = useId();
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);
  const { headingProps, textProps } = useSlotProps(
    classNames,
    titleId,
    titleSlotRef
  );
  const ctx = useMemo(() => ({ classNames, isTray: false }), [classNames]);

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
    <Dialog
      aria-label={ariaLabel}
      aria-labelledby={!ariaLabel && hasTitle ? titleId : ariaLabelledby}
      // Inherits the max height React Aria computes for the popover, so a
      // long body scrolls inside instead of being clipped by the surface.
      className={cn('max-h-[inherit]', classNames.body)}
      {...{ [`data-${width}`]: true }}
    >
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
    </Dialog>
  );

  return (
    <OverlayPopover
      {...props}
      placement={placement}
      matchTriggerWidth={false}
      isNonModal={modal !== true}
      keyboardDismissDisabled={!keyboardDismissable}
      shouldCloseOnInteractOutside={
        dismissable ? shouldCloseOnInteractOutside : () => false
      }
    >
      {/* React Aria only contains focus when the popover is its own dialog.
          Ours nests a `<Dialog>` for the close slot and labelling, so
          containment is applied here for both focus-holding modes. */}
      {modal === false ? dialog : <FocusScope contain>{dialog}</FocusScope>}
    </OverlayPopover>
  );
};

PopoverBase.Trigger = PopoverTrigger;
PopoverBase.Content = PopoverContent;
PopoverBase.Search = PopoverSearch;

export const Popover: PopoverComponent = PopoverBase;
