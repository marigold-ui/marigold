import { Children } from 'react';
import { DialogTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { Modal } from '../Overlay/Modal';
import { Dialog } from './Dialog';

// Props
// ---------------

export interface DialogTriggerProps
  extends Omit<RAC.DialogTriggerProps, 'isOpen'> {
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}
// Component
// ---------------

const _DialogTrigger = ({
  open,
  dismissable,
  keyboardDismissable,
  ...rest
}: DialogTriggerProps) => {
  const props: RAC.DialogTriggerProps = {
    isOpen: open,
    ...rest,
  };
  const children = Children.toArray(props.children);
  const [dialogTrigger, dialog] = children;
  const hasDialogTrigger = (dialogTrigger as any).type !== Dialog;
  return (
    <DialogTrigger {...props}>
      {hasDialogTrigger && dialogTrigger}
      <Modal
        dismissable={dismissable}
        keyboardDismissable={keyboardDismissable}
      >
        {dialog}
      </Modal>
    </DialogTrigger>
  );
};

export { _DialogTrigger as DialogTrigger };
