import React, { useRef } from 'react';
import { FocusableProvider } from '@react-aria/focus';
import { useOverlayPosition } from '@react-aria/overlays';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';
import { TooltipContext } from './Context';
import { Overlay } from '../Overlay';
// Component
// ---------------
export const TooltipTrigger = ({
  disabled,
  open,
  delay = 1000,
  placement = 'top',
  children,
  ...rest
}) => {
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
  return React.createElement(
    FocusableProvider,
    { ref: tooltipTriggerRef, ...triggerProps },
    tooltipTrigger,
    React.createElement(
      TooltipContext.Provider,
      {
        value: {
          state,
          overlayRef,
          arrowProps,
          placement: overlayPlacement,
          ...tooltipProps,
          ...positionProps,
        },
      },
      React.createElement(Overlay, { open: state.isOpen }, tooltip)
    )
  );
};
//# sourceMappingURL=TooltipTrigger.js.map
