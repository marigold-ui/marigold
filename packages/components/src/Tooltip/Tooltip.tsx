import React, { ReactNode } from 'react';
import { useTooltip } from '@react-aria/tooltip';

import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { useTooltipContext } from './Context';
import { TooltipTrigger } from './TooltipTrigger';

// Theme Extension
// ---------------
export interface TooltipThemeExtension
  extends ThemeExtensionsWithParts<'Tooltip', ['container', 'arrow']> {}

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

  const styles = useComponentStyles(
    'Tooltip',
    { variant, size },
    { parts: ['container', 'arrow'] }
  );

  return (
    <Box
      {...tooltipProps}
      {...rest}
      ref={overlayRef}
      css={styles.container}
      data-placement={placement}
    >
      <div>{children}</div>
      <Box
        {...arrowProps}
        __baseCSS={{
          position: 'absolute',
          height: 0,
          width: 0,
          borderStyle: 'solid',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
        css={styles.arrow}
      />
    </Box>
  );
};

Tooltip.Trigger = TooltipTrigger;
