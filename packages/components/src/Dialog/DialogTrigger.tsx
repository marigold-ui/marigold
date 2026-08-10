import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components/Dialog';
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

const _DialogTrigger = ({
  open,
  dismissable,
  // Escape has to close the dialog unless a consumer explicitly opts out: a
  // dialog the keyboard cannot leave is an accessibility defect. Matches the
  // default in `Tray` and `useNonModal`.
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
      <DialogTrigger {...props}>
        <PressResponder isPressed={false}>{props.children}</PressResponder>
      </DialogTrigger>
    </DialogContext>
  );
};

export { _DialogTrigger as DialogTrigger };
