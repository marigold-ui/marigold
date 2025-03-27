import type { DialogProps } from 'react-aria-components';
import { Dialog } from 'react-aria-components';
import { DrawerModal } from './DrawerModal';
import { DrawerTrigger } from './DrawerTrigger';

export interface DrawerProps
  extends Omit<DialogProps, 'className' | 'style' | 'isOpen'> {
  /**
   * Whether the overlay is open by default (controlled).
   * @default undefined
   */
  open?: boolean;
  /**
   * Whether to close the modal when the user interacts outside it.
   * @default false
   */
  dismissable?: boolean;
  /**
   * Whether pressing the escape key closes the modal.
   * @default true
   */
  keyboardDismissable?: boolean;
}

export const Drawer = ({
  children,
  open,
  dismissable,
  keyboardDismissable,
  ...props
}: DrawerProps) => {
  return (
    <DrawerModal open={open} keyboardDismissable={keyboardDismissable}>
      <Dialog className="h-full bg-red-500" {...props}>
        {children}
      </Dialog>
    </DrawerModal>
  );
};

Drawer.Trigger = DrawerTrigger;
