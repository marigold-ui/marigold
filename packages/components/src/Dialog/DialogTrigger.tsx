import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { DialogTrigger as RACDialogTrigger } from 'react-aria-components/Dialog';
import { PressResponder } from '@react-aria/interactions';
import type { DialogContextProps } from './Context';
import { DialogContext } from './Context';

// Props
// ---------------
type RemovedProps =
  'children' | 'isOpen' | 'isDismissable' | 'isKeyboardDismissDisabled';

export interface DialogTriggerProps
  extends
    Omit<RAC.DialogTriggerProps, 'isOpen' | 'render'>,
    Omit<DialogContextProps, RemovedProps> {
  /** Whether the overlay is open by default (controlled). */
  open?: boolean;
}

// Context
// ---------------

const DialogTrigger = ({
  open,
  dismissable,
  // A dialog the keyboard cannot leave is an accessibility defect, so opting
  // out has to be explicit. Same default as `Tray` and `useNonModal`.
  keyboardDismissable = true,
  ...rest
}: DialogTriggerProps): ReactNode => {
  const ctx = {
    isDismissable: dismissable,
    isKeyboardDismissDisabled: !keyboardDismissable,
  };

  const props: RAC.DialogTriggerProps = {
    isOpen: open,
    ...rest,
  };

  return (
    <DialogContext value={ctx}>
      <RACDialogTrigger {...props}>
        <PressResponder isPressed={false}>{props.children}</PressResponder>
      </RACDialogTrigger>
    </DialogContext>
  );
};

export { DialogTrigger };
