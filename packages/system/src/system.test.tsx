import React from 'react';
import { render } from '@testing-library/react';
import { system } from './system';

test('did we break React.forwardRef?', () => {
  const myRef = React.createRef<HTMLElement>();
  const Component = system<{}, 'div'>(props => <div {...props} />);
  render(<Component ref={myRef}>I have a ref!</Component>);

  expect(myRef.current).toBeInstanceOf(HTMLDivElement);
});

/**
 * The following tests are not actually testing anything, rather
 * make sure that the typings work as intended.
 *
 * If we mess something up, the typechecking will not work.
 */
test('usage with `as` prop', () => {
  type ComponentProps = {
    extra: string;
    children?: React.ReactNode | ((value?: number) => JSX.Element);
  };
  const Component = system<ComponentProps, 'button'>(
    ({ as: Comp = 'button', extra, className, children, ...props }) => {
      return (
        <Comp {...props}>
          {typeof children === 'function' ? children(56) : children}
        </Comp>
      );
    }
  );

  /**
   * Prop `extra` is required and button attributes allowed.
   */
  expect(() => {
    render(<Component extra="prop" type="button" />);
  }).not.toThrow();

  /**
   * Yay, the `href` attribute is allowed because we're rendering
   * an anchor tag!
   */
  expect(() => {
    render(<Component as="a" extra="required" href="example.com" />);
  }).not.toThrow();

  /**
   * Render another component and adhere to its props. In this case
   * the `to` prop is required by `<Link />`. Also, the `extra` prop
   * from our original component is still required.
   */
  expect(() => {
    const Link: React.FC<{ to: string; optional?: boolean }> = ({
      to,
      children,
      ...props
    }) => (
      <a href={to} {...props}>
        {children}
      </a>
    );

    render(<Component as={Link} extra="extra" to="adticket.de" />);
  }).not.toThrow();
});

test('usage of the `variant` prop', () => {
  type ComponentProps = {};
  const Component = system<ComponentProps, 'div'>(
    ({ as: Comp = 'div', variant = 'basic', children, ...props }) => (
      <Comp {...props} />
    )
  );

  expect(() => {
    render(<Component />);
  }).not.toThrow();

  expect(() => {
    render(<Component variant="advanced" />);
  }).not.toThrow();
});
