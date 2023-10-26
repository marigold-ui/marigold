import * as React from 'react';

/**
 * Get props from a HTML element without `ref` and strip the `style` prop.
 *
 * @example <caption>Will contain all HTML attributes of a regular button element, minus "style"</caption>
 * type ButtonProps = ComponentProps<'button'>
 */
export type HtmlProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  'style'
>;

/**
 * Get props from a HTML element with `ref` and strip the `style` prop.
 *
 * @example <caption>Will contain all HTML attributes of a regular button element, minus "style"</caption>
 * type ButtonProps = ComponentProps<'button'>
 */
export type HtmlPropsWithRef<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  'style'
>;

/**
 * Infer the props of a component `C`.
 */
export type PropsOf<C> = C extends React.FC<infer P>
  ? P
  : C extends React.Component<infer Props>
  ? Props
  : never;

/**
 * Like a regular `Omit` but handles when the passed type is `never`.
 */
export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

/**
 * Fix the weird behaviro or the forwardRef types.
 * Source: https://www.totaltypescript.com/pass-component-as-prop-react
 *
 * @example const fixedForwardRef = forwardRef as FixedForwardRef;
 */
export type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

/**********************************************/
/*                                            */
/*            POLYMORPIC COMPONENT            */
/*                                            */
/**********************************************/
/**
 * Polymorphic types are based on Radix's (now deprecated) types.
 * They can be found here: https://github.com/radix-ui/primitives/blob/2f139a832ba0cdfd445c937ebf63c2e79e0ef7ed/packages/react/polymorphic/src/polymorphic.ts
 */

/**
 * Merge two objects into one. Second one will override properties of the
 * first one.
 *
 * Note: We can not use `Merge` from type-fest here, because for whatever reasons
 * the optional modifier will be removed.
 *
 * @internal
 */
type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;

/**
 * Used to merge properties of an HTML element with additional props defined in a component.
 *
 * @internal
 */
type MergeProps<T, P = {}> = P &
  Merge<
    T extends React.ElementType
      ? Omit<React.ComponentPropsWithRef<T>, 'className'>
      : {},
    P
  >;

/**
 * Narrow down instrinsic elements to the keys (HTML tags).
 *
 * @internal
 */
type NarrowIntrinsic<E> = E extends keyof JSX.IntrinsicElements ? E : never;

/**
 * Infer the (additional) props of the component `C` if it a `PolymorphicComponent`.
 * This not include any properties added to a polymorphic component based on its
 * instrinstic element type.
 */
export type OwnProps<C> = C extends PolymorphicComponent<any, infer P>
  ? P
  : never;

export type IntrinsicElement<C> = C extends PolymorphicComponent<infer I, any>
  ? I
  : never;

export interface PolymorphicComponent<
  T,
  P = {},
  /**
   * Extends original type to ensure built in React types play nice
   * with polymorphic components still e.g. `React.ElementRef` etc.
   */
> extends React.ForwardRefExoticComponent<MergeProps<T, P & { as?: T }>> {
  /**
   * USE CASE: `as` porp is a string:
   *
   * Merges original own props (without DOM props) and the inferred props
   * from `as` element with the own props taking precendence.
   *
   * We explicitly define a `JSX.IntrinsicElements` overload so that
   * events are typed for consumers.
   */
  <As extends keyof JSX.IntrinsicElements = NarrowIntrinsic<T>>(
    props: MergeProps<As, P & { as: As }>
  ): React.ReactElement | null;

  /**
   * USE CASE: `as` porp is a component:
   *
   * Merges original own props (without DOM props) and the inferred props
   * from `as` element with the own props taking precendence.
   *
   * We don't use `React.ComponentType` here as we get type errors
   * when consumers try to do inline `as` components.
   */
  <As extends React.ElementType>(
    props: MergeProps<As, P & { as: As }>
  ): React.ReactElement | null;
}
