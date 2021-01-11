import { useClassname } from './useClassname';

import * as resetStyleRefs from './normalize';
import { ElementType } from 'react';

export type StylesProps = {
  element?: ElementType[];
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
   * Normalization styles looked up by html tag name(s). Base normalization
   * is always applied.
   */

  var elementArray: ElementType[] = [];
  if (element) {
    element.push('base'); // always apply base styles
    elementArray = element;
  } else {
    elementArray = ['base'];
  }
  const resetStyles = resetStyleRefs.el;
  const elements: { [key: string]: any }[] = elementArray.map(
    styleObject => resetStyles[styleObject as keyof typeof resetStyleRefs.el]
  );

  const elementObject = Object.assign({}, ...elements);

  const basedOnNormalize = useClassname(elementObject);
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

  return [basedOnNormalize, basedOnVariants, custom, classNames].join(' ');
};
