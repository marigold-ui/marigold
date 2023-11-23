import { TooltipTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

type RemovedProps = 'isDisabled' | 'isOpen';
export interface TooltipTriggerProps
  extends Omit<RAC.TooltipTriggerComponentProps, RemovedProps> {
  disabled?: RAC.TooltipTriggerComponentProps['isDisabled'];
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
