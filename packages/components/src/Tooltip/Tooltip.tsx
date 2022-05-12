import React, { ReactNode } from 'react';
import { useTooltip } from '@react-aria/tooltip';

import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { useTooltipContext } from './Context';

// Theme Extension
// ---------------
export interface TooltipThemeExtension extends ThemeExtension<'Tooltip'> {}

// Props
// ---------------
export interface TooltipProps extends ComponentProps<'div'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Tooltip = ({ children, variant, size }: TooltipProps) => {
  const { arrowProps, state, overlayRef, placement, ...rest } =
    useTooltipContext();
  const { tooltipProps } = useTooltip({}, state);

  const styles = useComponentStyles('Tooltip', { variant, size });

  return (
    <Box {...tooltipProps} {...rest} ref={overlayRef} css={styles}>
      <span>{children}</span>
      <Box {...arrowProps} data-placement={placement} />
    </Box>
  );
};
