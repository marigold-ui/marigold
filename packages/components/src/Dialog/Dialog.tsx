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
import { CloseButton } from '../CloseButton';
import { Modal, ModalProps } from '../Overlay';
import { DialogContext } from './Context';
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';
import { DialogTrigger } from './DialogTrigger';

// Helper
// ---------------
interface InnerDialogProps
  extends Omit<RAC.DialogProps, 'className' | 'style'> {
  className: {
    container: string;
    closeButton: string;
  };
  closeButton?: boolean;
  children?:
    | React.ReactNode
    | ((args: { close: () => void }) => React.ReactNode);
}

/**
 * Needed so that the close button and function can be used inside the dialog,
 * when the dialog is controlled and no <Dialog.Trigger> is used.
 */
const InnerDialog = forwardRef(
  (
    { className, closeButton, ...props }: InnerDialogProps,
    ref: Ref<HTMLElement> | undefined
  ) => {
    const state = useContext(OverlayTriggerStateContext);
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
          'relative mx-auto outline-hidden',
          "grid [grid-template-areas:'title'_'content'_'actions']",
          className.container
        )}
      >
        {closeButton && (
          <CloseButton
            className={className.closeButton}
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
  extends Omit<RAC.DialogProps, 'className' | 'style'>,
    Pick<ModalProps, 'open' | 'onOpenChange'> {
  variant?: string;
  size?: 'xsmall' | 'small' | 'medium' | (string & {});
  /**
   * Show the close button.
   */
  closeButton?: boolean;
}

interface DialogComponent
  extends ForwardRefExoticComponent<
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
    { variant, size, open, onOpenChange, children, ...props }: DialogProps,
    ref: Ref<HTMLElement> | undefined
  ) => {
    const classNames = useClassNames({
      component: 'Dialog',
      variant,
      size,
    });
    const ctx = useContext(DialogContext);

    return (
      <Modal
        size={size}
        dismissable={ctx.isDismissable}
        keyboardDismissable={ctx.isKeyboardDismissDisabled}
        open={typeof open === 'boolean' ? open : undefined}
        onOpenChange={onOpenChange}
      >
        <InnerDialog ref={ref} className={classNames} {...props}>
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
