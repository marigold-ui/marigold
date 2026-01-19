import type { ReactNode } from 'react';
import { DialogTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { PressResponder } from '@react-aria/interactions';
import type { DialogContextProps } from './Context';
import { DialogContext } from './Context';

// Props
// ---------------
type RemovedProps =
  | 'children'
  | 'isOpen'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled';

export interface DialogTriggerProps
  extends
    Omit<RAC.DialogTriggerProps, 'isOpen'>,
    Omit<DialogContextProps, RemovedProps> {
  /** Whether the overlay is open by default (controlled). */
  open?: boolean;
}

// Context
// ---------------

const _DialogTrigger = ({
  open,
  dismissable,
  keyboardDismissable,
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
    <DialogContext.Provider value={ctx}>
      <DialogTrigger {...props}>
        <PressResponder isPressed={false}>{props.children}</PressResponder>
      </DialogTrigger>
    </DialogContext.Provider>
  );
};

export { _DialogTrigger as DialogTrigger };
