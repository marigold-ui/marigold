import { Children } from 'react';
import { DialogTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { Modal } from '../Overlay/Modal';
import { Dialog } from './Dialog';

// Props
// ---------------

export interface DialogTriggerProps
  extends Omit<RAC.DialogTriggerProps, 'isOpen'> {
  /**
   * Wheather compnent is rendered.
   * @default false
   */
  open?: boolean;

  /**
   * Whether to close the overlay when the user interacts outside it.
   * @default false
   */
  dismissable?: boolean;

  /**
   * Whether pressing the escape key to close the overlay should be disabled.
   */
  keyboardDismissable?: boolean;

  /**
   * If `true`, the dialog will be non-modal, meaning it will not block interaction with the background content.
   */
  isNonModal?: boolean;
}

// Component
// ---------------

const _DialogTrigger = ({
  open,
  dismissable,
  keyboardDismissable,
  isNonModal,
  ...rest
}: DialogTriggerProps) => {
  const props: RAC.DialogTriggerProps = {
    isOpen: open,
    ...rest,
  };
  const children = Children.toArray(props.children);
  const [dialogTrigger, dialog] = children;
  const hasDialogTrigger = (dialogTrigger as any).type !== Dialog;
  const currentDialog =
    children.length < 2 ? !hasDialogTrigger && dialogTrigger : dialog;
  if (isNonModal)
    return <DialogTrigger {...props}>{props.children}</DialogTrigger>;
  return (
    <DialogTrigger {...props}>
      {hasDialogTrigger && dialogTrigger}
      <Modal
        dismissable={dismissable}
        keyboardDismissable={keyboardDismissable}
      >
        {currentDialog}
      </Modal>
    </DialogTrigger>
  );
};

export { _DialogTrigger as DialogTrigger };
