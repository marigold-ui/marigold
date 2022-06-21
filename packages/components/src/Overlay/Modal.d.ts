import React, { HTMLAttributes, ReactNode } from 'react';
export interface ModalProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  dismissable?: boolean;
  keyboardDismissable?: boolean;
}
export declare const Modal: React.ForwardRefExoticComponent<
  ModalProps & React.RefAttributes<HTMLDivElement>
>;
//# sourceMappingURL=Modal.d.ts.map
