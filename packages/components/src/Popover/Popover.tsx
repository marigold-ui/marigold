import type { ReactNode } from 'react';
import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components/Dialog';
import { PopoverContext } from './Context';
import { PopoverContent } from './PopoverContent';
import { PopoverSearch } from './PopoverSearch';

// Props
// ---------------
export interface PopoverProps extends Omit<
  RAC.DialogTriggerProps,
  'isOpen' | 'render'
> {
  /**
   * Whether the popover is open (controlled).
   */
  open?: RAC.DialogTriggerProps['isOpen'];

  /**
   * Whether the popover closes when the user interacts outside of it.
   * @default true
   */
  dismissable?: boolean;

  /**
   * Whether the popover closes when the user presses Escape. A popover the
   * keyboard cannot leave is an accessibility defect, so opting out has to be
   * explicit.
   * @default true
   */
  keyboardDismissable?: boolean;
}

interface PopoverComponent {
  (props: PopoverProps): ReactNode;
  Content: typeof PopoverContent;
  Search: typeof PopoverSearch;
}

// Component
// ---------------
const PopoverRoot = ({
  open,
  dismissable = true,
  keyboardDismissable = true,
  ...rest
}: PopoverProps) => {
  const ctx = useMemo(
    () => ({ dismissable, keyboardDismissable }),
    [dismissable, keyboardDismissable]
  );

  // No `PressResponder isPressed={false}` like `Dialog.Trigger`: the trigger
  // of an anchored overlay stays marked while it is open, same as `Menu`.
  return (
    <PopoverContext value={ctx}>
      <DialogTrigger isOpen={open} {...rest} />
    </PopoverContext>
  );
};

PopoverRoot.Content = PopoverContent;
PopoverRoot.Search = PopoverSearch;

export const Popover: PopoverComponent = PopoverRoot;
