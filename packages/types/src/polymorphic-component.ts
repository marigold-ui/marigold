export type ElementType<P = any> = React.ElementType<P>;

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: ElementType;
  };

export type PolymorphicProps<
  T extends ElementType,
  Props extends object = {}
> = PropsOf<T> & Props;

/**
 * Merge two objects into one, second one will override properties of the
 * first one.
 *
 * We can not use `Merge` from type-fest here, because for whatever reasons
 * the optional modifier will be removed.
 */
type SimpleMerge<Source extends object, Override extends object> = Omit<
  Source,
  keyof Override
> &
  Override;

type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  Props extends object = {},
  AsComponent extends ElementType = ElementType
> = SimpleMerge<ComponentProps, Props> &
  SimpleMerge<AsProps, Props> & { as?: AsComponent };

export type PolymorphicComponent<
  Component extends ElementType,
  Props extends object = {}
> = {
  <AsComponent extends ElementType = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};
