import { useClassname } from './useClassname';

import * as resetStyleRefs from './normalize';
import { ThemeUIStyleObject } from '@theme-ui/css';

export type StylesProps = {
  element: string[];
  variant?: string | string[];
  [key: string]: any;
};

/**
 * hook function that can add base styles, normalization, variant and custom styles
 */
export const useStyles = (
  { element, variant, ...styles }: StylesProps,
  classNames?: string
) => {
  /**
   * Normalization styles looked up by html tag name(s). Base normalization
   * is always applied.
   */
  // get style object with all normalization styles
  const resetStyles = resetStyleRefs.el;
  // add base to each element
  element.push('base');
  // get reset styles for each of the elements
  const elements = element.map(
    styleObject => resetStyles[styleObject as keyof typeof resetStyleRefs.el]
  );

  // console.log('elements: ', elements); // in array
  // console.log('...elements: ', ...elements); // just object(s)

  const basedOnNormalize = useClassname(elements);

  /**
   * Variants are retrieved from the theme.
   */
  const variants = Array.isArray(variant)
    ? variant.map(v => ({ variant: v }))
    : [{ variant }];

  // console.log('...variants: ', ...variants);
  // console.log('...elements: ', ...elements);
  // console.log('styles: ', styles);
  const basedOnVariants = useClassname(...variants);

  /**
   * Custom styles are applied "on runtime". They are usually controlled via component
   * props and can change between component instances. They are more or less the `css`
   * prop of `emotion`.
   */
  const custom = useClassname(styles);

  return [basedOnNormalize, basedOnVariants, custom, classNames].join(' ');
};
