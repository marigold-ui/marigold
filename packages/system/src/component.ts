/**
 * 1. transform object to "variant string"
 * 2. pass to Box' variant prop
 */

// const Button = ({}) => {
//   const styles = f({ component: 'Button', size: 'small', variant: 'primary' }); // base + size + variant

//   return <Box css={{}} />;
// };

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

export type ComponentStyles<T extends ReadonlyArray<string>> = {
  [P in T[number]]: string[];
};

export function useComponentStyles(
  componentName: string,
  props?: ComponentStylesProps,
  options?: {
    parts: never;
  }
): string[];

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
  [P in Parts[number]]: string[];
};

export function useComponentStyles(
  componentName: string,
  props?: ComponentStylesProps = {},
  options?: any = {}
) {
  // Just some PoC that the overloads work
  if (options.parts) {
    return {
      [options.parts[0]]: ['asd'],
      [options.parts[1]]: ['asd'],
    };
  }

  return ['foo'];
}

// useRef for perf

// Q: if we get styles from the theme and deep merge directly,
//    can we avoid using `variant` and instead pass it to `__baseCSS`/`css` directly?
