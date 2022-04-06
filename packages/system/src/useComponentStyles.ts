import merge from 'deepmerge';

import { CSSObject } from './types';
import { useTheme } from './useTheme';

/**
 * 1. transform object to "variant string"
 * 2. pass to Box' variant prop
 */

// const Button = ({}) => {
//   const styles = f({ component: 'Button', size: 'small', variant: 'primary' }); // base + size + variant

//   return <Box css={{}} />;
// };

// Helper
// ---------------
const get = (obj: object, path: string | string[]): any => {
  const keys = typeof path === 'string' ? path.split('.') : path;
  return keys.reduce((acc, key) => acc && (acc as any)[key], obj);
};

// Types
// ---------------
export type ComponentState =
  | 'hover'
  | 'focus'
  | 'active'
  | 'visited'
  | 'disabled'
  | 'readOnly'
  | 'error'
  | 'checked'
  | 'indeterminate';

export interface ComponentStylesProps {
  variant?: string;
  size?: string;
  state?: ComponentState;
}

export function useComponentStyles(
  componentName: string,
  props?: ComponentStylesProps,
  options?: {
    parts: never;
  }
): CSSObject;

export function useComponentStyles<
  Part extends string,
  Parts extends ReadonlyArray<Part>
>(
  componentName: string,
  props?: ComponentStylesProps,
  options?: {
    parts: Parts;
  }
): {
  [P in Parts[number]]: CSSObject;
};

export function useComponentStyles(
  componentName: string,
  props: ComponentStylesProps = {},
  options: any = {}
) {
  const { theme } = useTheme();
  const styles = get(theme, `components.${componentName}`);

  // Just some PoC that the overloads work
  if (options.parts) {
    return {
      [options.parts[0]]: {},
      [options.parts[1]]: {},
    };
  }

  return merge(
    styles.base,
    props.variant ? styles?.variant?.[props.variant] ?? {} : {}
  );
}

// useRef for perf

// Q: if we get styles from the theme and deep merge directly,
//    can we avoid using `variant` and instead pass it to `__baseCSS`/`css` directly?
// -> Make we can remove variant from `<Box>` altogether then? (since this hook is the better appraoch)
