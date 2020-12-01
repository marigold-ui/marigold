import { useClassname } from './useClassname';

export type StylesProps = {
  variant?: string | string[];
  [key: string]: any;
};

/**
 * hook function that can add base styles, variant and custom styles
 */
export const useStyles = ({ variant, ...styles }: StylesProps) => {
  /**
   * Base styles are always applied. They are used to normalize the appearance for a
   * component between browsers.
   */
  const base = useClassname({
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  });

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

  return [base, basedOnVariants, custom].join(' ');
};
