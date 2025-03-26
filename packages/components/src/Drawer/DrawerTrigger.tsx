import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components';

// Props
// ---------------
export interface DialogTriggerProps
  extends Omit<RAC.DialogTriggerProps, 'isOpen'> {
  /**
   * Whether the overlay is open by default (controlled).
   * @default false
   */
  open?: boolean;
}

// Component
// ---------------
export const _DialogTrigger = ({
  open,
  children,
  ...props
}: DialogTriggerProps) => (
  <DialogTrigger isOpen={open} {...props}>
    {children}
  </DialogTrigger>
);
