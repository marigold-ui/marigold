import React, { ReactNode } from 'react';
import { useTooltip } from '@react-aria/tooltip';

import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { useTooltipContext } from './Context';

export interface TooltipProps extends ComponentProps<'div'> {
  children?: ReactNode;
}

export const Tooltip = ({ children }: TooltipProps) => {
  const { state, overlayRef } = useTooltipContext();
  const { tooltipProps } = useTooltip({}, state);

  return (
    <Box {...tooltipProps} ref={overlayRef}>
      {children}
    </Box>
  );
};
