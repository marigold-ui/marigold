export type ComponentType<P = any> = React.ElementType<P>;

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
  AsComponent extends ComponentType = ComponentType
> = SimpleMerge<ComponentProps, Props> &
  SimpleMerge<AsProps, Props> & { as?: AsComponent };

export type ComponentWithAs<
  Component extends ComponentType,
  Props extends object = {}
> = {
  <AsComponent extends ComponentType = Component>(
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

export interface PolymorphicComponent<
  T extends ComponentType,
  P extends object = {}
> extends ComponentWithAs<T, P> {}
