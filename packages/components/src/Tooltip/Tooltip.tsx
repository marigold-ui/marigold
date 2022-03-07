import React, { useContext } from 'react';
import { useTooltip } from '@react-aria/tooltip';
import { mergeProps } from '@react-aria/utils';
import { TooltipTriggerProps } from '@react-types/tooltip';

import { Box } from '../Box';
import { TooltipContext } from './TooltipTrigger';

// Theme Extension
// ---------------
export interface TooltipThemeExtension<Value> {
  tooltip?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface TooltipProps extends TooltipTriggerProps {
  variant?: string;
}

// Component
// ---------------
export const Tooltip: React.FC<TooltipProps> = ({
  variant = '',
  children,
  ...props
}) => {
  const { state, ...tooltipProviderProps } = useContext(TooltipContext);
  const mergedProps = mergeProps(props, tooltipProviderProps);
  const { tooltipProps } = useTooltip(mergedProps, state);

  return (
    <Box position="relative" {...tooltipProps}>
      <Box position="absolute" variant={`tooltip.${variant}`} {...mergedProps}>
        {children}
      </Box>
    </Box>
  );
};
