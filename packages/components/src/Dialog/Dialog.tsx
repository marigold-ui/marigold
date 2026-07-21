import type { Ref } from 'react';
import { use, useId, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import {
  OverlayTriggerStateContext,
  Dialog as RACDialog,
} from 'react-aria-components/Dialog';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { ActionMenuContext } from '../Menu/ActionMenuContext';
import { Modal, ModalProps } from '../Overlay/Modal';
import { useOverlayRootSlotProps } from '../utils/useOverlayRootSlotProps';
import { useSlot } from '../utils/useSlot';
import { DialogContext, DialogSlotContext } from './Context';
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogDescription } from './DialogDescription';
import { DialogHeader } from './DialogHeader';
import { DialogTitle } from './DialogTitle';
import { DialogTrigger } from './DialogTrigger';

// Helper
// ---------------
type InnerDialogProps = Omit<DialogProps, 'open' | 'onOpenChange'> & {
  ref?: Ref<HTMLElement>;
};

/**
 * Needed so that the close button and function can be used inside the dialog,
 * when the dialog is controlled and no <Dialog.Trigger> is used.
 */
const InnerDialog = ({
  variant,
  size,
  closeButton,
  children,
  ref,
  'aria-label': ariaLabel,
  ...props
}: InnerDialogProps) => {
  const state = use(OverlayTriggerStateContext);
  const titleId = useId();
  const classNames = useClassNames({
    component: 'Dialog',
    variant,
    size,
  });
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);
  const isFullscreen = size === 'fullscreen';

  if (
    process.env.NODE_ENV !== 'production' &&
    !ariaLabel &&
    !hasTitle &&
    !props['aria-labelledby']
  ) {
    console.warn(
      '[Dialog] Renders a dialog without an accessible name. Provide a ' +
        '`<Dialog.Title>` (or a bare `<Title slot="title">`) or an ' +
        '`aria-label` so screen reader users can identify the dialog.'
    );
  }

  const resolvedChildren =
    typeof children === 'function'
      ? children({ close: state?.close ?? (() => {}) })
      : children;

  // Published at the Dialog root so a `<Dialog.Title>` (or a bare
  // `<Title slot="title">`) works without a wrapping `<Dialog.Header>`. The
  // `title` slot carries the header chrome (padding) so a title-only dialog
  // still looks like a titled bar; `<Dialog.Header>` re-publishes a stripped
  // variant when it owns the chrome itself.
  const { headingProps: rootHeadingProps, textProps } = useOverlayRootSlotProps(
    { classNames, titleId, titleSlotRef }
  );

  const contextValue = useMemo(
    () => ({ classNames, titleId, hasTitle, titleSlotRef }),
    [classNames, titleId, hasTitle, titleSlotRef]
  );

  return (
    <RACDialog
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      aria-labelledby={
        !ariaLabel && hasTitle ? titleId : props['aria-labelledby']
      }
      className={cn(
        'relative mx-auto outline-hidden',
        // Fullscreen fills the Modal box, other sizes hug their content.
        isFullscreen
          ? 'size-full max-h-full max-w-full'
          : 'max-h-[80vh] max-w-[90vw]',
        "grid [grid-template-areas:'title'_'content'_'actions']",
        classNames.container,
        // Grid with pinned rows and a clipped surface, so only the inner content scrolls, not the dialog.
        isFullscreen &&
          'grid grid-rows-[auto_minmax(0,1fr)_auto] overflow-x-hidden overflow-y-hidden'
      )}
    >
      {closeButton && (
        <CloseButton
          className={classNames.closeButton}
          onPress={state?.close}
        />
      )}
      <Provider
        values={[
          [DialogSlotContext, contextValue],
          [HeadingContext, rootHeadingProps],
          [TextContext, textProps],
          [ActionMenuContext, {}],
        ]}
      >
        {resolvedChildren}
      </Provider>
    </RACDialog>
  );
};

// Props
// ---------------
export interface DialogProps
  extends
    Omit<RAC.DialogProps, 'className' | 'style' | 'render'>,
    Pick<ModalProps, 'open' | 'onOpenChange'> {
  variant?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'fullscreen' | (string & {});
  /**
   * Show the close button.
   */
  closeButton?: boolean;
}

// Component
// ---------------
const DialogBase = ({
  open,
  onOpenChange,
  children,
  ref,
  ...props
}: DialogProps & { ref?: Ref<HTMLElement> }) => {
  const ctx = use(DialogContext);

  return (
    <Modal
      size={props.size}
      dismissable={ctx.isDismissable}
      keyboardDismissable={ctx.isKeyboardDismissDisabled}
      open={typeof open === 'boolean' ? open : undefined}
      onOpenChange={onOpenChange}
    >
      <InnerDialog ref={ref} {...props}>
        {children}
      </InnerDialog>
    </Modal>
  );
};

export const Dialog = Object.assign(DialogBase, {
  Trigger: DialogTrigger,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Content: DialogContent,
  Actions: DialogActions,
});
