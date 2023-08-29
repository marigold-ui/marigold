import React, { forwardRef } from 'react';

import { HtmlProps } from '@marigold/types';

import { cn } from '../../utils';

export interface SVGProps extends Omit<HtmlProps<'svg'>, 'fill'> {
  size?: number | string | number[] | string[];
  className?: string;
}

export const SVG = forwardRef<SVGSVGElement, SVGProps>(
  ({ size = 24, children, className, ...props }, ref) => (
    <svg
      {...props}
      ref={ref}
      width={`${props.width || size}px`}
      height={`${props.height || size}px`}
      className={cn('flex-none fill-current', className)}
    >
      {children}
    </svg>
  )
);
