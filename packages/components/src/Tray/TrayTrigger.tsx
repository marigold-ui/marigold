import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components';

// Props
// ---------------
export interface TrayTriggerProps extends Omit<
  RAC.DialogTriggerProps,
  'isOpen' | 'children'
> {
  /**
   * Whether the overlay is open by default (controlled).
   * @default false
   */
  open?: boolean;
  /**
   * Children of the trigger.
   */
  children: ReactNode;
}

// Component
// ---------------
export const TrayTrigger = ({ open, children, ...props }: TrayTriggerProps) => (
  <DialogTrigger isOpen={open} {...props}>
    {children}
  </DialogTrigger>
);
