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
import { Modal } from '../Overlay';
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';
import { DialogContext, DialogTrigger } from './DialogTrigger';

export interface DialogProps
  extends Omit<RAC.DialogProps, 'className' | 'style'> {
  variant?: string;
  size?: string;
  /**
   * Show the close button.
   */
  closeButton?: boolean;
}

interface DialogComponent
  extends ForwardRefExoticComponent<
    DialogProps & RefAttributes<HTMLInputElement>
  > {
  /**
   * Options for the Combobox.
   */
  Trigger: typeof DialogTrigger;

  Title: typeof DialogTitle;

  Content: typeof DialogContent;

  Actions: typeof DialogActions;
}

// Props
// ---------------
export interface DialogProps
  extends Omit<RAC.DialogProps, 'className' | 'style'> {
  variant?: string;
  size?: string;
  /**
   * Show the close button.
   */
  closeButton?: boolean;
  /**
   * If `true`, the dialog will be non-modal, meaning it will not block interaction with the background content.
   * @default false
   */
  isNonModal?: boolean;
}

const _Dialog = forwardRef(
  (props: DialogProps, ref: Ref<HTMLElement> | undefined) => {
    const classNames = useClassNames({
      component: 'Dialog',
      variant: props.variant,
      size: props.size,
    });
    const { isDismissable, isKeyboardDismissDisabled, isOpen } =
      useContext(DialogContext);

    const state = useContext(OverlayTriggerStateContext);

    const children =
      typeof props.children === 'function'
        ? props.children({
            close: state?.close ?? (() => {}),
          })
        : props.children;

    return (
      <Modal
        dismissable={isDismissable}
        keyboardDismissable={isKeyboardDismissDisabled}
        open={isOpen}
      >
        <Dialog
          {...props}
          ref={ref}
          className={cn(
            'relative mx-auto outline-hidden [&>*:not(:last-child)]:mb-4',
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
