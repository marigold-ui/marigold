import { HTMLAttributes, RefObject } from 'react';
import { TooltipTriggerState } from '@react-stately/tooltip';
import { PlacementAxis } from '@react-types/overlays';
export interface TooltipContextProps extends HTMLAttributes<HTMLElement> {
  state?: TooltipTriggerState;
  overlayRef?: RefObject<HTMLDivElement>;
  placement?: PlacementAxis;
  arrowProps?: HTMLAttributes<HTMLElement>;
}
export declare const TooltipContext: import('react').Context<TooltipContextProps>;
export declare const useTooltipContext: () => TooltipContextProps;
//# sourceMappingURL=Context.d.ts.map
