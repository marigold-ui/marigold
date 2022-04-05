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

export interface ComponentStylesOptions {
  parts?: string[];
}

export const useComponentStyles = (
  componentName: string,
  props?: ComponentStylesProps = {},
  options: ComponentStylesOptions = {}
) => {};

// useRef for perf
