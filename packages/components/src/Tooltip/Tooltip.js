import React from 'react';
import { useTooltip } from '@react-aria/tooltip';
import { Box, useComponentStyles } from '@marigold/system';
import { useTooltipContext } from './Context';
import { TooltipTrigger } from './TooltipTrigger';
// Component
// ---------------
export const Tooltip = ({ children, variant, size }) => {
  const { arrowProps, state, overlayRef, placement, ...rest } =
    useTooltipContext();
  const { tooltipProps } = useTooltip({}, state);
  const styles = useComponentStyles(
    'Tooltip',
    { variant, size },
    { parts: ['container', 'arrow'] }
  );
  return React.createElement(
    Box,
    {
      ...tooltipProps,
      ...rest,
      ref: overlayRef,
      css: styles.container,
      'data-placement': placement,
    },
    React.createElement('div', null, children),
    React.createElement(Box, {
      ...arrowProps,
      __baseCSS: {
        position: 'absolute',
        height: 0,
        width: 0,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
      },
      css: styles.arrow,
    })
  );
};
Tooltip.Trigger = TooltipTrigger;
//# sourceMappingURL=Tooltip.js.map
