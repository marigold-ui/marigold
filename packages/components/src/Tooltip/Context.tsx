import { createContext, use } from 'react';

export interface TooltipContextProps {
  setOpen: (open: boolean | undefined) => void;
}

export const TooltipContext = createContext<TooltipContextProps>({
  setOpen: () => {},
});

export const useTooltipContext = () => use(TooltipContext);
