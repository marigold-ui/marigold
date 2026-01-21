import { ReactNode } from 'react';
import { TooltipTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

type RemovedProps = 'isDisabled' | 'isOpen' | 'children';
export interface TooltipTriggerProps extends Omit<
  RAC.TooltipTriggerComponentProps,
  RemovedProps
> {
  /**
   * The children of the component.
   */
  children: ReactNode;
  /**
   * Whether the tooltip should be disabled, independent from the trigger.
   */
  disabled?: RAC.TooltipTriggerComponentProps['isDisabled'];
  /**
   * Control the visibility of the tooltip.
   */
  open?: boolean;
}

const _TooltipTrigger = ({
  delay = 1000,
  children,
  disabled,
  open,
  ...rest
}: TooltipTriggerProps) => {
  const props = {
    ...rest,
    isDisabled: disabled,
    isOpen: open,
    delay,
  };

  return <TooltipTrigger {...props}>{children}</TooltipTrigger>;
};

export { _TooltipTrigger as TooltipTrigger };
