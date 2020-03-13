import React from 'react';
import { render } from '@testing-library/react';
import { system } from './system';

/**
 * Smoketest
 */
test('did we break React.forwardRef?', () => {
  const myRef = React.createRef<HTMLElement>();
  const Component = system((_, ref) => <div ref={ref} />);
  render(<Component ref={myRef}>I have a ref!</Component>);

  expect(myRef.current instanceof HTMLDivElement).toBeTruthy();
});

/**
 * The following tests are not actually testing anything, rather
 * make sure that the typings work as intented.
 *
 * If we messed something up the typechecking will not work.
 */
test('usage with `as` prop', () => {
  type ComponentProps = {
    extra: string;
    children?: React.ReactNode | ((value?: number) => JSX.Element);
  };
  const Component = system<ComponentProps, 'button'>(
    ({ as: Comp = 'button', extra, className, children, ...props }, ref) => {
      return (
        <Comp ref={ref} {...props}>
          {typeof children === 'function' ? children(56) : children}
        </Comp>
      );
    }
  );

  expect(() => {
    render(<Component extra="prop" type="button" />);
  }).not.toThrow();

  expect(() => {
    render(<Component as="a" extra="required" href="reservix.de" />);
  }).not.toThrow();

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
