/**
 * Stolen from: https://github.com/reach/reach-ui/blob/4cb497f530b0f83f80c6f6f2da46ab55b1160cb6/packages/utils/src/types.tsx
 */

import {
  forwardRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
  Ref,
  ValidationMap,
  WeakValidationMap,
} from 'react';

export type PropsWithAs<P, T extends ElementType> = P &
  Omit<ComponentPropsWithRef<T>, 'as' | keyof P> & {
    as?: T;
  };

export type PropsFromAs<P, T extends ElementType> = (PropsWithAs<P, T> & {
  as: T;
}) &
  PropsWithAs<P, T>;

export interface ComponentWithAs<T extends ElementType, P> {
  /**
   * These types are a bit of a hack, but cover us in cases where the `as` prop
   * is not a JSX string type. Makes the compiler happy so 🤷‍♂️
   */
  <TT extends ElementType>(props: PropsWithAs<P, TT>): ReactElement | null;
  (props: PropsWithAs<P, T>): ReactElement | null;

  displayName?: string;
  propTypes?: WeakValidationMap<PropsWithAs<P, T>>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<PropsWithAs<P, T>>;
}

export function system<P, T extends ElementType>(
  render: (props: PropsFromAs<P, T>, ref: Ref<any>) => ReactElement | null
) {
  return (forwardRef(render as any) as unknown) as ComponentWithAs<T, P>;
}
