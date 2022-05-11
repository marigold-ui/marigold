import React, { ReactNode } from 'react';
import { useTooltipTriggerState } from '@react-stately/tooltip';

export interface TooltipTriggerProps {
  children: [trigger: ReactNode, menu: ReactNode];
  disabled?: boolean;
}

export const TooltipTrigger = ({
  disabled: isDisabled,
  children,
  ...rest
}: TooltipTriggerProps) => {
  const [trigger, tooltip] = React.Children.toArray(children);
  const props = { ...rest, isDisabled };

  const state = useTooltipTriggerState(props);
};
