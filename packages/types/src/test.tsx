export interface BaseProps {}

export type As<Props = any> = React.ElementType<Props>;

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<
  Target,
  'transition' | 'as' | 'color' | 'translate' | OmitAdditionalProps
> & {
  htmlTranslate?: 'yes' | 'no' | undefined;
};

export type SimpleMerge<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As
> = SimpleMerge<ComponentProps, AdditionalProps> &
  SimpleMerge<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
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

export interface PolymorpshicComponent<T extends As, P extends object = {}>
  extends ComponentWithAs<T, P> {}

export type BoxOwnProps = { className?: string };

export const Box: PolymorpshicComponent<'div', BoxOwnProps> = props => (
  <div {...props}></div>
);

export const SimpleBox = () => <Box>Hello</Box>;
// @ts-expect-error
export const NotAPropBox = () => <Box foo="bar"></Box>;
export const HrefBox = () => <Box as="a" href="http://example.com"></Box>;
// @ts-expect-error
export const BrokenBox = () => <Box as="span" href="http://example.com"></Box>;
