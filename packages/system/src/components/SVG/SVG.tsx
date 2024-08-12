import React, { forwardRef } from 'react';
import { HtmlProps } from '@marigold/types';
import { useTheme } from '../../hooks';
import { cn, createVar, getColor } from '../../utils';

export interface SVGProps extends Omit<HtmlProps<'svg'>, 'fill' | 'style'> {
  /**
   * The size of an svg.
   */
  size?: number | string | number[] | string[];
  /**
   * To add a className on svg and icons.
   */
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
