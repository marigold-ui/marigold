import { createContext } from 'react';
import type RAC from 'react-aria-components';

export interface DialogContextProps extends RAC.ModalOverlayProps {
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}
export const DialogContext = createContext<DialogContextProps>({});
