/**
 * Typings are based on [Reach UI](https://github.com/reach/reach-ui/blob/4cb497f530b0f83f80c6f6f2da46ab55b1160cb6/packages/utils/src/types.tsx).
 */
import {
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
  createElement,
  forwardRef,
} from 'react';

/**
 * SystemProps support the `as` and `variant` prop. The former
 * is used to changed the rendered root element of a component.
 *
 * These props also infer additional allowed props based on the
 * value of the `as` prop. For example, setting `as="button"` will
 * allow to use HTMLButtonAttributes on the component.
 */
export type AsProps<P, T extends ElementType> = P &
  Omit<ComponentPropsWithRef<T>, 'as' | keyof P> & {
    as?: T;
  };

/**
 * Enhanced version of `React.FunctionComponent` that accepts `SystemProps`
 * and infers allowed properties based on the `as` prop.
 */
export interface ComponentWithAs<P, T extends ElementType> {
  /**
   * These types are a bit of a hack, but cover us in cases where the `as` prop
   * is not a JSX string type. Makes the compiler happy so 🤷‍♂️
   */
  <TT extends ElementType>(props: AsProps<P, TT>): ReactElement | null;
  (props: AsProps<P, T>): ReactElement | null;

  displayName?: string;
  propTypes?: WeakValidationMap<AsProps<P, T>>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<AsProps<P, T>>;
}

export const Box: ComponentWithAs<{}, 'div'> = forwardRef((props: any, ref) => {
  const { as = 'div', children, ...rest } = props;
  return createElement(as, { ...rest, ref }, children);
});
