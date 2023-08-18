import React, { ReactElement, useRef } from 'react';

import { FocusableProvider } from '@react-aria/focus';
import { useOverlayPosition } from '@react-aria/overlays';
import { useTooltipTrigger } from '@react-aria/tooltip';

import { useTooltipTriggerState } from '@react-stately/tooltip';

import { PositionProps } from '@react-types/overlays';
import { TooltipTriggerProps as AriaTooltipTriggerProps } from '@react-types/tooltip';

import { Overlay } from '../Overlay';
import { TooltipContext } from './Context';

// Props
// ---------------
export interface TooltipTriggerProps
  extends Omit<AriaTooltipTriggerProps, 'isDisabled' | 'isOpen'>,
    Omit<PositionProps, 'isOpen'> {
  children: [trigger: ReactElement, menu: ReactElement];
  disabled?: boolean;
  open?: boolean;
}

// Component
// ---------------
export const TooltipTrigger = ({
  disabled,
  open,
  delay = 1000,
  placement = 'top',
  children,
  ...rest
}: TooltipTriggerProps) => {
  const [tooltipTrigger, tooltip] = React.Children.toArray(children);
  const props = {
    ...rest,
    isDisabled: disabled,
    isOpen: open,
    delay,
    placement,
  };

  const tooltipTriggerRef = useRef(null);
  const overlayRef = useRef(null);

  const state = useTooltipTriggerState(props);

  const { triggerProps, tooltipProps } = useTooltipTrigger(
    props,
    state,
    tooltipTriggerRef
  );

  const {
    overlayProps: positionProps,
    placement: overlayPlacement,
    arrowProps,
  } = useOverlayPosition({
    placement: props.placement,
    targetRef: tooltipTriggerRef,
    offset: props.offset,
    crossOffset: props.crossOffset,
    isOpen: state.isOpen,
    overlayRef,
  });

  return (
    <FocusableProvider ref={tooltipTriggerRef} {...triggerProps}>
      {tooltipTrigger}
      <TooltipContext.Provider
        value={{
          state,
          overlayRef,
          arrowProps,
          placement: overlayPlacement,
          ...tooltipProps,
          ...positionProps,
        }}
      >
        <Overlay open={state.isOpen}>{tooltip}</Overlay>
      </TooltipContext.Provider>
    </FocusableProvider>
  );
};
