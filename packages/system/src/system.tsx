/**
 * Typings are based on [Reach UI](https://github.com/reach/reach-ui/blob/4cb497f530b0f83f80c6f6f2da46ab55b1160cb6/packages/utils/src/types.tsx).
 */
import {
  forwardRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
} from 'react';

/**
 * SystemProps support the `as` and `variant` prop. The former
 * is used to changed the rendered root element of a component.
 *
 * These props also infer additional allowed props based on the
 * value of the `as` prop. For example, setting `as="button"` will
 * allow to use HTMLButtonAttributes on the component.
 */
export type SystemProps<P, T extends ElementType> = P &
  Omit<ComponentPropsWithRef<T>, 'as' | keyof P> & {
    as?: T;
    variant?: string;
  };

/**
 * Enhanced version of `React.FunctionComponent` that accepts `SystemProps`
 * and infers allowed properties based on the `as` prop.
 */
export interface SystemComponent<P, T extends ElementType> {
  /**
   * These types are a bit of a hack, but cover us in cases where the `as` prop
   * is not a JSX string type. Makes the compiler happy so 🤷‍♂️
   */
  <TT extends ElementType>(props: SystemProps<P, TT>): ReactElement | null;
  (props: SystemProps<P, T>): ReactElement | null;

  displayName?: string;
  propTypes?: WeakValidationMap<SystemProps<P, T>>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<SystemProps<P, T>>;
}

/**
 * Helper to write components that adhere to a common design system API,
 * which includes the `as` and `variant` prop.
 */
export function system<P, T extends ElementType>(
  render: (props: SystemProps<P, T>) => ReactElement | null
) {
  return forwardRef((props: any, ref) =>
    render({ ...props, ref })
  ) as SystemComponent<P, T>;
}
