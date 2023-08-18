import { HTMLAttributes, RefObject, createContext, useContext } from 'react';

import { TooltipTriggerState } from '@react-stately/tooltip';

import { PlacementAxis } from '@react-types/overlays';

export interface TooltipContextProps extends HTMLAttributes<HTMLElement> {
  state?: TooltipTriggerState;
  overlayRef?: RefObject<HTMLDivElement>;
  placement?: PlacementAxis;
  arrowProps?: HTMLAttributes<HTMLElement>;
}

export const TooltipContext = createContext<TooltipContextProps>({});
export const useTooltipContext = () => useContext(TooltipContext);
