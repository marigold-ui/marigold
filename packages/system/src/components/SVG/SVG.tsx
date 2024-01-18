import React, { forwardRef } from 'react';

import { cn, createVar, getColor, useTheme } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

export interface SVGProps extends Omit<HtmlProps<'svg'>, 'fill' | 'style'> {
  size?: number | string | number[] | string[];
  className?: string;
}

export const SVG = forwardRef<SVGSVGElement, SVGProps>(
  ({ size = 24, children, className, color, ...props }, ref) => {
    const theme = useTheme();

    return (
      <svg
        {...props}
        ref={ref}
        width={`${props.width || size}px`}
        height={`${props.height || size}px`}
        className={cn('flex-none fill-current text-[--color]', className)}
        style={createVar({
          color: color && getColor(theme, color, color /* fallback */),
        })}
      >
        {children}
      </svg>
    );
  }
);
