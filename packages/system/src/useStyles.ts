import { useClassname } from './useClassname';

import { reset } from './reset';
import { ElementType } from 'react';

export type StylesProps = {
  element?: ElementType;
  variant?: string | string[];
  [key: string]: any;
};

/**
 * Hook function that can add base styles, normalization, variant and custom styles
 */
export const useStyles = (
  { element, variant, ...styles }: StylesProps,
  classNames?: string
) => {
  /**
   * Normalization styles looked up by html tag name. Base normalization
   * is always applied.
   */
  // always apply base normalization styles
  const normalizeBase = reset.base;

  // apply element normalization styles
  const basedOnNormalize =
    typeof element === 'string'
      ? (reset as { [key: string]: string })[element]
      : undefined;

  /**
   * Variants are retrieved from the theme.
   */
  const variants = Array.isArray(variant)
    ? variant.map(v => ({ variant: v }))
    : [{ variant }];
  const basedOnVariants = useClassname(...variants);

  /**
   * Custom styles are applied "on runtime". They are usually controlled via component
   * props and can change between component instances. They are more or less the `css`
   * prop of `emotion`.
   */
  const custom = useClassname(styles);

  return [
    normalizeBase,
    basedOnNormalize,
    basedOnVariants,
    custom,
    classNames,
  ].join(' ');
};
