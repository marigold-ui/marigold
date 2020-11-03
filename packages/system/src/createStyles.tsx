import { useClassname } from './useClassname';

export type UseStylesProps = {
  variant?: string | string[];
  [key: string]: any;
};

/**
 * Factory function that creates a `useStyles` hook.
 */
export const createStyles = (section: any, normalization: any = {}) => ({
  variant = [],
  ...styles
}: UseStylesProps) => {
  /**
   * Base styles are always applied. The are used to normalize the appearance for a
   * component between browsers.
   */
  const base = useClassname({
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
    ...normalization,
  });

  /**
   * Variants are retrieved from the theme.
   */
  const basedOnVariants = [variant]
    .map(v => useClassname({ variant: `${section}.${v}` }))
    .join(' ');

  /**
   * Custom styles are applied "on runtime". They are usually controlled via component
   * props and can change between component instances. They are more or less the `css`
   * prop of `emotion`.
   */
  const custom = useClassname(styles);

  return [base, basedOnVariants, custom].join(' ');
};
