import type { Ref } from 'react';
import { HtmlProps } from '@marigold/types';
import { cn } from '../../utils/className.utils';
import { ensureCssVar } from '../../utils/css-variables.utils';

/**
 * @deprecated Use `@marigold/icons` or a native `<svg>`. Removed in the next major.
 */
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

let hasWarned = false;

// A function declaration, so a component body never reassigns module state.
function warnDeprecated() {
  if (process.env.NODE_ENV === 'production' || hasWarned) return;
  hasWarned = true;
  console.warn(
    '[Marigold] <SVG> from @marigold/system is deprecated and will be removed ' +
      'in the next major. Use an icon from @marigold/icons, or a native <svg> ' +
      '(e.g. <svg className="size-6 fill-current">) for other inline graphics.'
  );
}

/**
 * @deprecated Use `@marigold/icons` or a native `<svg>`. Removed in the next major.
 */
export const SVG = ({
  size = 24,
  children,
  className,
  color,
  ref,
  ...props
}: SVGProps) => {
  warnDeprecated();

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
