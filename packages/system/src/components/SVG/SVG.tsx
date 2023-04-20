import React, { forwardRef } from 'react';
import { HtmlProps } from '@marigold/types';

import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

// Make sure that numbered values are converted to px.
const toDimension = (value: number | string | number[] | string[]) =>
  Array.isArray(value)
    ? value.map(ensureNumberOrToken)
    : ensureNumberOrToken(value);
const ensureNumberOrToken = (value: number | string) =>
  typeof value === 'string' && /^[0-9]+$/.test(value) ? Number(value) : value;

export interface SVGProps extends Omit<HtmlProps<'svg'>, 'fill'> {
  size?: number | string | number[] | string[];
  className?: string;
}

export const SVG = forwardRef<SVGSVGElement, SVGProps>(
  ({ size = 24, children, className, ...props }, ref) => {
    const styledSVG = tv({
      base: [`flex-none fill-current`],
    });

    return (
      <svg
        {...props}
        ref={ref}
        width={`${toDimension(props.width || size)}px`}
        height={`${toDimension(props.height || size)}px`}
        className={twMerge(styledSVG(), className)}
      >
        {children}
      </svg>
    );
  }
);
