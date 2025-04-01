import { useDOMRef } from '@react-spectrum/utils';
import { forwardRef, useContext } from 'react';
import type RAC from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import { DOMRef } from '@react-types/shared';
import { cn, useClassNames } from '@marigold/system';
import { DialogActions } from '../Dialog/DialogActions';
import { DialogContent } from '../Dialog/DialogContent';
import { DialogTitle } from '../Dialog/DialogTitle';
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
  /**
   * If `true`, the dialog will be non-modal, meaning it will not block interaction with the background content.
   * @default false
   */
  isNonModal?: boolean;
}

interface CloseButtonProps {
  className?: string;
}

const CloseButton = ({ className }: CloseButtonProps) => {
  const ctx = useContext(OverlayTriggerStateContext);
  return (
    <div className="absolute top-4 right-4 ml-4">
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
    </div>
  );
};

/**
 * Dialogs are windows containing contextual information, tasks, or workflows that appear over the user interface.
 * Depending on the kind of Dialog, further interactions may be blocked until the Dialog is acknowledged.
 */
const _Dialog = forwardRef((props: DialogProps, ref: DOMRef) => {
  let domRef = useDOMRef(ref);
  const classNames = useClassNames({
    component: 'Dialog',
    variant: props.variant,
    size: props.size,
  });
  const { isDismissable, isKeyboardDismissDisabled, isOpen } =
    useContext(DialogContext);
  return (
    <Modal
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={isOpen}
    >
      <Dialog
        {...props}
        ref={domRef}
        className={cn(
          'relative outline-hidden [&>*:not(:last-child)]:mb-4',
          "grid [grid-template-areas:'title'_'content'_'actions']",
          classNames.container
        )}
      >
        {props.closeButton && (
          <CloseButton className={classNames.closeButton} />
        )}
        {props.children}
      </Dialog>
    </Modal>
  );
});

_Dialog.Trigger = DialogTrigger;
_Dialog.Title = DialogTitle;
_Dialog.Content = DialogContent;
_Dialog.Actions = DialogActions;

export { _Dialog as Dialog };
