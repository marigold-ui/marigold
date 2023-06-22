import React, { ReactNode } from 'react';
import { useTooltip } from '@react-aria/tooltip';

import { cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { useTooltipContext } from './Context';
import { TooltipTrigger } from './TooltipTrigger';

// Props
// ---------------
export interface TooltipProps extends HtmlProps<'div'> {
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

  const classNames = useClassNames({ component: 'Tooltip', variant, size });

  return (
    <div
      {...tooltipProps}
      {...rest}
      ref={overlayRef}
      className={cn('group/tooltip', classNames.container)}
      data-placement={placement}
    >
      <div>{children}</div>
      <div
        {...arrowProps}
        className={cn('absolute h-0 w-0', classNames.arrow)}
      />
    </div>
  );
};

Tooltip.Trigger = TooltipTrigger;
