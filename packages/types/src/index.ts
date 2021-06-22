import React from 'react';

/**
 * Get values of an `array` as literals.
 */
export type ValueOf<T> = T[keyof T];

/**
 * Merge to types. Second one overrides the first one.
 */
type Merge<T, U> = Omit<T, keyof U> & U;

/**
 * Get props without supporting `ref` and strip the `style` prop.
 *
 * @example <caption>Will contain all HTML attributes of a regular button element, minus "style"</caption>
 * type ButtonProps = ComponentProps<'button'>
 */
export type ComponentProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  'style'
>;

/**
 * Get props with supporting `ref` and strip the `style` prop.
 *
 * @example <caption>Will contain all HTML attributes of a regular button element, minus "style"</caption>
 * type ButtonProps = ComponentProps<'button'>
 */
export type ComponentPropsWithRef<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  'style'
>;

/**********************************************/
/*                                            */
/*            POLYMORPIC COMPONENT            */
/*                                            */
/**********************************************/

// Remove call signature from `ForwardRefExoticComponent` so we can override it
type ForwardRefComponent<P> = Pick<
  React.ForwardRefExoticComponent<P>,
  keyof React.ForwardRefExoticComponent<any>
>;

/**
 * Props for the polymorphic `as` prop.
 */
export type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };

/**
 * Helper type to create props including the polymorphic `as` prop, but no `ref`.
 */
export type PolymorphicProps<P, T extends React.ElementType> = Merge<
  ComponentProps<T>,
  PropsWithAs<P, T>
>;

/**
 * Helper type to create props including the polymorphic `as` prop and forwarding `ref`.
 */
export type PolymorphicPropsWithRef<P, T extends React.ElementType> = Merge<
  ComponentPropsWithRef<T>,
  PropsWithAs<P, T>
>;

/**
 * Create a polymorphpic component with the `as` prop.
 * 
 * This type can be used to create a component that allows to change the rendered 
 * element via its `as` prop.
 *
 * @example
 * const Component: = ((props:ComponentProps) => <div>{props.children}</div>))
 *  as PolymorphicComponent<ComponentProps, 'div'>;
 */
export interface PolymorphicComponent<P, T extends React.ElementType>
  extends React.Component<any> {
  (
    props: P & React.ComponentProps<T> & { as?: never }
  ): React.ReactElement<P> | null;
  <As extends React.ElementType>(
    props: PolymorphicProps<P, As>
  ): React.ReactElement<P> | null;
}

/**
 * Create a polymorphpic component with the `as` prop that also support passing a `ref`.
 * 
 * This type can be used to create a component that allows to change the rendered 
 * element via its `as` prop and forwarding a `ref` to it.
 *
 * **Note: you should use React's `forwardRef` with this type.**
 *
 * @example
 * const Component: PolymorphicComponentWithRef<ComponentProps, 'div'>
 *   = forwardRef((props, ref) => <div>{props.children}</div>);
 */
export interface PolymorphicComponentWithRef<P, T extends React.ElementType>
  extends ForwardRefComponent<any> {
  (
    props: P & React.ComponentPropsWithRef<T> & { as?: never }
  ): React.ReactElement<P> | null;
  <As extends React.ElementType>(
    props: PolymorphicPropsWithRef<P, As>
  ): React.ReactElement<P> | null;
}
