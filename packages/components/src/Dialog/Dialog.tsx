import type { Ref } from 'react';
import { use } from 'react';
import type RAC from 'react-aria-components';
import {
  OverlayTriggerStateContext,
  Dialog as RACDialog,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { Modal, ModalProps } from '../Overlay/Modal';
import { DialogContext } from './Context';
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';
import { DialogTrigger } from './DialogTrigger';

// Helper
// ---------------
type InnerDialogProps = Pick<
  DialogProps,
  'variant' | 'size' | 'closeButton' | 'children'
>;

/**
 * Needed so that the close button and function can be used inside the dialog,
 * when the dialog is controlled and no <Dialog.Trigger> is used.
 */
const InnerDialog = ({
  variant,
  size,
  closeButton,
  ref,
  ...props
}: InnerDialogProps & { ref?: Ref<HTMLElement> }) => {
  const state = use(OverlayTriggerStateContext);
  const classNames = useClassNames({
    component: 'Dialog',
    variant,
    size,
  });

  const children =
    typeof props.children === 'function'
      ? props.children({
          close: state?.close ?? (() => {}),
        })
      : props.children;

  return (
    <RACDialog
      {...props}
      ref={ref}
      className={cn(
        'relative mx-auto max-h-[80vh] max-w-[90vw] outline-hidden',
        "grid [grid-template-areas:'title'_'content'_'actions']",
        classNames.container
      )}
    >
      {closeButton && (
        <CloseButton
          className={classNames.closeButton}
          onPress={state?.close}
        />
      )}
      {children}
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
  size?: 'xsmall' | 'small' | 'medium' | (string & {});
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
  Title: DialogTitle,
  Content: DialogContent,
  Actions: DialogActions,
});
