import React from 'react';

/**
 * Get values of an `array` as literals.
 */
export type ValueOf<T> = T[keyof T];

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
/*     COMPONENT SUPPORTING THE "AS" PROP     */
/*                                            */
/**********************************************/

// Remove call signature from `ForwardRefExoticComponent` so we can override it
type ForwardRefComponent<P> = Pick<
  React.ForwardRefExoticComponent<P>,
  keyof React.ForwardRefExoticComponent<any>
>;

/**
 * Props containing the generic `as` prop and supporting `ref`.
 */
export type AsProps<P, T extends React.ElementType> = P &
  Omit<ComponentPropsWithRef<T>, 'as' | keyof P> & {
    as?: T;
  };

/**
 * Component that supports the `as` prop. Meaning, the component allows to change
 * the element that is bening renders.
 *
 * This is convenient to create components like `<Text>` that can render as different
 * text elements like `h1`, `h2`, `p` and so on.
 *
 * **Note: you should use React's `forwardRef` with this type.**
 *
 * @example
 * const Component: ComponentWithAs<{ foo?: string; }, 'div'>
 *   = forwardRef((props, ref) => <div>p{rops.children}</div>);
 */
export interface ComponentWithAs<P, T extends React.ElementType>
  extends ForwardRefComponent<any> {
  (
    props: P & React.ComponentPropsWithRef<T> & { as?: never }
  ): React.ReactElement<P> | null;
  <As extends React.ElementType>(
    props: AsProps<P, As>
  ): React.ReactElement<P> | null;
}
