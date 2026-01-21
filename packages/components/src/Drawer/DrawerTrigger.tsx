import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components';

// Props
// ---------------
export interface DrawerTriggerProps extends Omit<
  RAC.DialogTriggerProps,
  'isOpen'
> {
  /**
   * Whether the overlay is open by default (controlled).
   * @default false
   */
  open?: boolean;
}

// Component
// ---------------
export const DrawerTrigger = ({
  open,
  children,
  ...props
}: DrawerTriggerProps) => (
  <DialogTrigger isOpen={open} {...props}>
    {children}
  </DialogTrigger>
);
