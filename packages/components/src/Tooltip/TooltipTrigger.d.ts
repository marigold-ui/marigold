import { ReactElement } from 'react';
import { PositionProps } from '@react-types/overlays';
import { TooltipTriggerProps as AriaTooltipTriggerProps } from '@react-types/tooltip';
export interface TooltipTriggerProps
  extends Omit<AriaTooltipTriggerProps, 'isDisabled' | 'isOpen'>,
    Omit<PositionProps, 'isOpen'> {
  children: [trigger: ReactElement, menu: ReactElement];
  disabled?: boolean;
  open?: boolean;
}
export declare const TooltipTrigger: ({
  disabled,
  open,
  delay,
  placement,
  children,
  ...rest
}: TooltipTriggerProps) => JSX.Element;
//# sourceMappingURL=TooltipTrigger.d.ts.map
