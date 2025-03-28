import type { DialogProps } from 'react-aria-components';
import { Dialog } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { DrawerContext } from './Context';
import { DrawerModal } from './DrawerModal';
import { DrawerTrigger } from './DrawerTrigger';

// Props
// ---------------
export interface DrawerProps
  extends Omit<DialogProps, 'className' | 'style' | 'isOpen'> {
  variant?: string;
  size?: string;

  /**
   * Whether the overlay is open by default (controlled).
   * @default undefined
   */
  open?: boolean;
  /**
   * Whether pressing the escape key closes the modal.
   * @default true
   */
  keyboardDismissable?: boolean;
}

// Component
// ---------------
export const Drawer = ({
  children,
  variant,
  size,
  open,
  keyboardDismissable,
  ...props
}: DrawerProps) => {
  const classNames = useClassNames({ component: 'Drawer', variant, size });

  return (
    <DrawerContext.Provider value={{ classNames }}>
      <DrawerModal open={open} keyboardDismissable={keyboardDismissable}>
        <Dialog {...props} className={cn('h-full')}>
          {children}
        </Dialog>
      </DrawerModal>
    </DrawerContext.Provider>
  );
};

Drawer.Trigger = DrawerTrigger;
