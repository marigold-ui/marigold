import { type ReactNode, useMemo, useState } from 'react';
import { TooltipTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { TooltipContext } from './Context';

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

const TooltipTriggerComp = ({
  delay = 1000,
  children,
  disabled,
  open: triggerOpen,
  ...rest
}: TooltipTriggerProps) => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean | undefined>();
  const ctx = useMemo(() => ({ setOpen: setTooltipOpen }), []);

  const open = triggerOpen ?? tooltipOpen;

  const props = {
    ...rest,
    isDisabled: disabled,
    isOpen: open,
    delay,
  };

  return (
    <TooltipTrigger {...props}>
      <TooltipContext value={ctx}>{children}</TooltipContext>
    </TooltipTrigger>
  );
};

export { TooltipTriggerComp as TooltipTrigger };
