import React, { forwardRef } from 'react';
import { HtmlProps } from '@marigold/types';
import { cn, ensureCssVar } from '../../utils';

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
    return (
      <svg
        {...props}
        ref={ref}
        width={`${props.width || size}px`}
        height={`${props.height || size}px`}
        className={cn('flex-none fill-current', className)}
        style={{ color: ensureCssVar(color) }}
      >
        {children}
      </svg>
    );
  }
);
