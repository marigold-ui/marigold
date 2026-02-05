import {
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
  useContext,
} from 'react';
import type RAC from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
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
const InnerDialog = forwardRef(
  (
    { variant, size, closeButton, ...props }: InnerDialogProps,
    ref: Ref<HTMLElement> | undefined
  ) => {
    const state = useContext(OverlayTriggerStateContext);
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
      <Dialog
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
      </Dialog>
    );
  }
);

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

interface DialogComponent extends ForwardRefExoticComponent<
  DialogProps & RefAttributes<HTMLInputElement>
> {
  Trigger: typeof DialogTrigger;
  Title: typeof DialogTitle;
  Content: typeof DialogContent;
  Actions: typeof DialogActions;
}

// Component
// ---------------
const _Dialog = forwardRef(
  (
    { open, onOpenChange, children, ...props }: DialogProps,
    ref: Ref<HTMLElement> | undefined
  ) => {
    const ctx = useContext(DialogContext);

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
  }
) as DialogComponent;

_Dialog.Trigger = DialogTrigger;
_Dialog.Title = DialogTitle;
_Dialog.Content = DialogContent;
_Dialog.Actions = DialogActions;

export { _Dialog as Dialog };
