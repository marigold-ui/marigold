import React, { ReactNode, useRef } from 'react';
import { FocusableProvider } from '@react-aria/focus';
import { useOverlayPosition } from '@react-aria/overlays';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';
import { PositionProps } from '@react-types/overlays';
import { TooltipTriggerProps as AriaTooltipTriggerProps } from '@react-types/tooltip';
import { TooltipContext } from './Context';
import { Overlay } from '../Overlay';

export interface TooltipTriggerProps
  extends Omit<AriaTooltipTriggerProps, 'isDisabled' | 'isOpen'>,
    Omit<PositionProps, 'isOpen'> {
  children: [trigger: ReactNode, menu: ReactNode];
  disabled?: boolean;
  open?: boolean;
}

export const TooltipTrigger = ({
  disabled,
  open,
  children,
  ...rest
}: TooltipTriggerProps) => {
  const [tooltipTrigger, tooltip] = React.Children.toArray(children);
  const props = { ...rest, isDisabled: disabled, isOpen: open };

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
    arrowProps,
    placement,
  } = useOverlayPosition({
    placement: props.placement || 'top',
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
          placement,
          overlayRef,
          arrowProps,
          ...tooltipProps,
          ...positionProps,
        }}
      >
        <Overlay open={state.isOpen}>{tooltip}</Overlay>
      </TooltipContext.Provider>
    </FocusableProvider>
  );
};
