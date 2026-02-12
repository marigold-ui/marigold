import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components';

// Props
// ---------------
export interface TrayTriggerProps extends Omit<
  RAC.DialogTriggerProps,
  'isOpen'
> {
  /**
   * Whether the overlay is open (controlled).
   * @default false
   */
  open?: boolean;
}

// Component
// ---------------
export const TrayTrigger = ({ open, children, ...props }: TrayTriggerProps) => (
  <DialogTrigger isOpen={open} {...props}>
    {children}
  </DialogTrigger>
);
