'use client';

import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  type DialogProps,
  type DialogTriggerProps,
  ModalOverlay,
} from 'react-aria-components';

// Sheet.Trigger
// ---------------
export interface SheetTriggerProps extends DialogTriggerProps {}

const SheetTrigger = ({ children }: SheetTriggerProps) => {
  return <DialogTrigger>{children}</DialogTrigger>;
};

// Sheet
// ---------------
export interface SheetProps extends DialogProps {}

export const Sheet = ({ children, ...props }: SheetProps) => {
  return (
    <ModalOverlay
      className="bg-secondary-200/50 fixed inset-0 z-40 backdrop-blur-sm"
      isDismissable
    >
      <Modal>
        <Dialog
          className="bg-bg-surface fixed inset-y-0 px-8 pb-8 pt-4 shadow"
          {...props}
        >
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

Sheet.Trigger = SheetTrigger;
Sheet.Button = Button;
