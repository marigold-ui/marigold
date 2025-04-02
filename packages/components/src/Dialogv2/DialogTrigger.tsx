import { ReactNode, createContext } from 'react';
import { DialogTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { PressResponder } from '@react-aria/interactions';

export interface ModalProps extends RAC.ModalOverlayProps {
  open?: boolean;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
  size?: string;
}

export interface DialogTriggerProps
  extends RAC.DialogTriggerProps,
    Omit<ModalProps, 'children'> {}

export const DialogContext = createContext<ModalProps>({});

const _DialogTrigger = (props: DialogTriggerProps): ReactNode => {
  return (
    <DialogContext.Provider value={props}>
      <DialogTrigger {...props}>
        <PressResponder isPressed={false}>{props.children}</PressResponder>
      </DialogTrigger>
    </DialogContext.Provider>
  );
};

export { _DialogTrigger as DialogTrigger };
