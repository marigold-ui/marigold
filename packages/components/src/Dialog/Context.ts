import { createContext, HTMLAttributes, useContext } from 'react';

export interface DialogContextProps {
  open?: boolean;
  close?: () => void;
}

export const DialogContext = createContext<DialogContextProps>({});
export const useDialogContext = () => useContext(DialogContext);
