import React, { Ref, RefObject, useRef } from 'react';
import { FocusableProvider } from '@react-aria/focus';
import { useTooltipTrigger } from '@react-aria/tooltip';
import {
  TooltipTriggerState,
  useTooltipTriggerState,
} from '@react-stately/tooltip';

// TooltipContext
// ---------------
export const TooltipContext = React.createContext<{
  state?: TooltipTriggerState;
}>({});

// TooltipTrigger Component
// ---------------
export const TooltipTrigger: React.FC = ({ children, ...props }) => {
  const [trigger, tooltip] = React.Children.toArray(children);
  const state = useTooltipTriggerState(props);
  const tooltipTriggerRef = useRef<HTMLElement>();
  const { triggerProps, tooltipProps } = useTooltipTrigger(
    {},
    state,
    tooltipTriggerRef as RefObject<HTMLElement>
  );

  return (
    <FocusableProvider
      {...triggerProps}
      ref={tooltipTriggerRef as Ref<HTMLElement>}
    >
      {trigger}
      {state.isOpen && (
        <TooltipContext.Provider
          value={{
            state,
            ...tooltipProps,
          }}
        >
          {tooltip}
        </TooltipContext.Provider>
      )}
    </FocusableProvider>
  );
};
