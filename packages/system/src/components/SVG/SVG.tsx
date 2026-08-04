import type { Ref } from 'react';
import { HtmlProps } from '@marigold/types';
import { cn } from '../../utils/className.utils';
import { ensureCssVar } from '../../utils/css-variables.utils';

export interface SVGProps extends Omit<HtmlProps<'svg'>, 'fill' | 'style'> {
  /**
   * The size of an svg.
   */
  size?: number | string | number[] | string[];
  /**
   * To add a className on svg and icons.
   */
  className?: string;
  /**
   * Ref forwarded to the underlying `<svg>` element.
   */
  ref?: Ref<SVGSVGElement>;
}

export const SVG = ({
  size = 24,
  children,
  className,
  color,
  ref,
  ...props
}: SVGProps) => {
  return (
    <svg
      {...props}
      ref={ref}
      width={`${props.width || size}px`}
      height={`${props.height || size}px`}
      className={cn('flex-none fill-current', className)}
      style={{ color: color && ensureCssVar(color, 'color') }}
    >
      {children}
    </svg>
  );
};
