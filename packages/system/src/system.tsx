/**
 * Stolen from: https://github.com/reach/reach-ui/blob/4cb497f530b0f83f80c6f6f2da46ab55b1160cb6/packages/utils/src/types.tsx
 */

import {
  forwardRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
} from 'react';

export type SystemProps<P, T extends ElementType> = P &
  Omit<ComponentPropsWithRef<T>, 'as' | keyof P> & {
    as?: T;
  };

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

export function system<P, T extends ElementType>(
  render: (props: SystemProps<P, T>) => ReactElement | null
) {
  return forwardRef((props: any, ref) =>
    render({ ...props, ref })
  ) as SystemComponent<P, T>;
}
