import { ElementType } from 'react';
import { reset } from './reset';
import { CSSObject } from './types';
import { useClassname } from './useClassname';

export type UseStyleInput = {
	element?: ElementType;
	css?: Omit<CSSObject, 'variant' | 'element'> & { variant?: never; element?: never };
	variant?: string | string[];
	className?: string;
}

/**
 * Hook that can adds base styles, reset for certain elements, variants and custom styles
 */
export const useStyles = ({ element, css: styles = {}, variant, className = '' }: UseStyleInput) => {
  /**
   * Get reset styles. Base is always applied. An additional reset maybe applied
   * based on the passed element.
   *
   * We check the passed className if it already includes the reset styles so no
   * duplicates are applied.
   */
  const baseClassName = className.includes(reset.base) ? '' : reset.base;
  const resetClassName =
    typeof element === 'string'
      ? className.includes((reset as { [key: string]: string })[element])
        ? ''
        : (reset as { [key: string]: string })[element]
      : '';

  /**
   * Get variant styles (from theme).
   */
  const variants = Array.isArray(variant)
    ? variant.map(v => ({ variant: v }))
    : [{ variant }];
  const variantsClassName = useClassname(...variants);

  /**
   * Custom styles are applied "on runtime". They are usually controlled via component
   * props and can change between component instances.
   */
  const customClassName = useClassname(styles);

  return [
    baseClassName,
    resetClassName,
    variantsClassName,
    customClassName,
    className,
  ]
    .filter(Boolean)
    .join(' ');
};
