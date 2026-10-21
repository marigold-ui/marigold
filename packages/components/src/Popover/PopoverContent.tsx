import type { ReactNode } from 'react';
import { useId, useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { Dialog } from 'react-aria-components/Dialog';
import { FocusScope } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import type { PopoverProps as OverlayPopoverProps } from '../Overlay/Popover';
import { Popover as OverlayPopover } from '../Overlay/Popover';
import { useTrayContext } from '../Tray/Context';
import { Tray } from '../Tray/Tray';
import { intlMessages } from '../intl/messages';
import { useSlot } from '../utils/useSlot';
import { usePopoverContext } from './Context';

// Props
// ---------------
// RAC's popover API minus what the compound owns or what is internal: the
// open state and dismiss behaviour live on the `<Popover>` root, `isNonModal`
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
  | 'children';

export interface PopoverContentProps extends Omit<
  OverlayPopoverProps,
  RemovedProps
> {
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
   * Content of the popover. Use `<Title>` and `<Description>` for a heading:
   * they are styled and wired up as the popover's accessible name.
   */
  children?: ReactNode;
}

// Helpers
// ---------------
type SlotClassNames = { title: string; description: string };

const useSlotProps = (
  classNames: SlotClassNames,
  titleId: string | undefined,
  titleSlotRef: ((el: Element | null) => void) | undefined
) => {
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: classNames.title,
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
 * The slot config replaces the tray's own (providers do not merge), so it
 * carries the popover's look while keeping the tray's id and ref.
 */
const PopoverTrayBody = ({
  classNames,
  children,
}: {
  classNames: SlotClassNames;
  children?: ReactNode;
}) => {
  const { titleId, titleSlotRef } = useTrayContext();
  const { headingProps, textProps } = useSlotProps(
    classNames,
    titleId,
    titleSlotRef
  );

  return (
    <Tray.Content>
      <Provider
        values={[
          [HeadingContext, headingProps],
          [TextContext, textProps],
        ]}
      >
        <div className="flex flex-col gap-3">{children}</div>
      </Provider>
    </Tray.Content>
  );
};

// Component
// ---------------
export const PopoverContent = ({
  modal = true,
  width = 'medium',
  placement = 'bottom',
  shouldCloseOnInteractOutside,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}: PopoverContentProps) => {
  const { dismissable, keyboardDismissable } = usePopoverContext();
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
      className={classNames.content}
      {...{ [`data-${width}`]: true }}
    >
      <Provider
        values={[
          [HeadingContext, headingProps],
          [TextContext, textProps],
        ]}
      >
        {children}
      </Provider>
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
