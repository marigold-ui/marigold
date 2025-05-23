import { ReactNode, createContext } from 'react';
import { DialogTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { PressResponder } from '@react-aria/interactions';

type RemovedProps =
  | 'children'
  | 'isOpen'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled';
export interface ModalProps extends RAC.ModalOverlayProps {
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
  size?: string;
}

export interface DialogTriggerProps
  extends Omit<RAC.DialogTriggerProps, 'isOpen'>,
    Omit<ModalProps, RemovedProps> {}

export const DialogContext = createContext<ModalProps>({});

const _DialogTrigger = ({
  open,
  dismissable,
  keyboardDismissable,
  ...rest
}: DialogTriggerProps): ReactNode => {
  const props = {
    isOpen: open,
    isDismissable: dismissable,
    isKeyboardDismissDisabled: !keyboardDismissable,
    ...rest,
  };
  return (
    <DialogContext.Provider value={props}>
      <DialogTrigger {...props}>
        <PressResponder isPressed={false}>{props.children}</PressResponder>
      </DialogTrigger>
    </DialogContext.Provider>
  );
};

export { _DialogTrigger as DialogTrigger };
