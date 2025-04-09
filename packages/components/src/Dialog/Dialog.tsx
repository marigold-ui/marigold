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
import { DialogActions } from './DialogActions';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';
import { DialogContext, DialogTrigger } from './DialogTrigger';
import { Modal } from './Modal';

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

interface CloseButtonProps {
  className?: string;
}

const CloseButton = ({ className }: CloseButtonProps) => {
  const ctx = useContext(OverlayTriggerStateContext);
  return (
    <button
      className={cn(
        'h-4 w-4 cursor-pointer border-none p-0 leading-normal outline-0',
        className
      )}
      onClick={ctx?.close}
      slot="dismiss-button"
    >
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        />
      </svg>
    </button>
  );
};

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
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        isOpen={isOpen}
      >
        <Dialog
          {...props}
          ref={ref}
          className={cn(
            'relative outline-hidden [&>*:not(:last-child)]:mb-4',
            "grid [grid-template-areas:'title'_'content'_'actions']",
            classNames.container
          )}
        >
          {props.closeButton && (
            <CloseButton className={classNames.closeButton} />
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
