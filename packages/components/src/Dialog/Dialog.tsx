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
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';
import { DialogContext, DialogTrigger } from './DialogTrigger';

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
    { variant, size, open, onOpenChange, ...props }: DialogProps,
    ref: Ref<HTMLElement> | undefined
  ) => {
    const classNames = useClassNames({
      component: 'Dialog',
      variant,
      size,
    });
    const ctx = useContext(DialogContext);
    const state = useContext(OverlayTriggerStateContext);

    const children =
      typeof props.children === 'function'
        ? props.children({
            close: state?.close ?? (() => {}),
          })
        : props.children;

    return (
      <Modal
        dismissable={ctx.isDismissable}
        keyboardDismissable={ctx.isKeyboardDismissDisabled}
        size={size}
        open={typeof open === 'boolean' ? open : ctx.isOpen}
        onOpenChange={onOpenChange || ctx.onOpenChange}
      >
        <Dialog
          {...props}
          ref={ref}
          className={cn(
            'relative mx-auto outline-hidden',
            "grid [grid-template-areas:'title'_'content'_'actions']",
            classNames.container
          )}
        >
          {props.closeButton && (
            <CloseButton
              className={classNames.closeButton}
              onPress={state?.close}
            />
          )}
          {children}
        </Dialog>
      </Modal>
    );
  }
) as DialogComponent;

_Dialog.Trigger = DialogTrigger;
_Dialog.Title = DialogTitle;
_Dialog.Content = DialogContent;
_Dialog.Actions = DialogActions;

export { _Dialog as Dialog };
