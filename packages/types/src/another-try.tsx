import React from 'react';

type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

type AsProp<T extends React.ElementType> = {
  as?: T;
};

/**
 * Merge two objects into one, second one will override properties of the
 * first one.
 *
 * We can not use `Merge` from type-fest here, because for whatever reasons
 * the optional modifier will be removed.
 */
type Merge<Source extends object, Override extends object> = Omit<
  Source,
  keyof Override
> &
  Override;

type PolymorphicComponentProp<
  T extends React.ElementType,
  P extends object = {}
> = Merge<React.ComponentProps<T>, P> & P & AsProp<T>;

type PolymorphicComponentPropWithRef<
  T extends React.ElementType,
  Props extends object = {}
> = PolymorphicComponentProp<T, Props> & { ref?: PolymorphicRef<T> };

// ========================================
// ========================================
// ========================================
// ========================================

type TextProps<T extends React.ElementType> = PolymorphicComponentPropWithRef<
  T,
  { color?: 'yellow' | 'black' }
>;

type TextComponent = <T extends React.ElementType = 'span'>(
  props: TextProps<T>
) => React.ReactElement | null;

export const Text: TextComponent = React.forwardRef(
  <T extends React.ElementType = 'span'>(
    { as, color, children }: TextProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const Component = as || 'span';

    const style = color ? { style: { color } } : {};

    return (
      <Component {...style} ref={ref}>
        {children}
      </Component>
    );
  }
);
