import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components/Dialog';
import { PopoverTriggerContext } from './Context';

// Props
// ---------------
export interface PopoverTriggerProps extends Omit<
  RAC.DialogTriggerProps,
  'isOpen' | 'render'
> {
  /**
   * Whether the popover is open (controlled).
   */
  open?: RAC.DialogTriggerProps['isOpen'];

  /**
   * Whether the popover closes when the user interacts outside of it. On
   * small screens the popover opens as a tray with a single dismissal setting,
   * so `false` there also keeps Escape and a swipe from closing it.
   * @default true
   */
  dismissable?: boolean;

  /**
   * Whether the popover closes when the user presses Escape. A popover the
   * keyboard cannot leave is an accessibility defect, so opting out has to be
   * explicit. On small screens `false` also keeps a swipe and a press outside
   * from closing the tray.
   * @default true
   */
  keyboardDismissable?: boolean;
}

// Component
// ---------------
export const PopoverTrigger = ({
  open,
  dismissable = true,
  keyboardDismissable = true,
  ...rest
}: PopoverTriggerProps) => {
  const ctx = useMemo(
    () => ({ dismissable, keyboardDismissable }),
    [dismissable, keyboardDismissable]
  );

  // No `PressResponder isPressed={false}` like `Dialog.Trigger`: the trigger
  // of an anchored overlay stays marked while it is open, same as `Menu`.
  return (
    <PopoverTriggerContext value={ctx}>
      <DialogTrigger isOpen={open} {...rest} />
    </PopoverTriggerContext>
  );
};
