import React, { createElement, forwardRef, useRef } from 'react';
import {
  PolymorphicProps,
  PolymorphicComponentWithRef,
  PolymorphicComponent,
} from '.';

// Polymorpic Component with Ref
// ---------------
export type BoxOwnProps = { className?: string };

export const Box: PolymorphicComponentWithRef<BoxOwnProps, 'div'> = forwardRef<
  HTMLDivElement,
  PolymorphicProps<BoxOwnProps, 'div'>
>(({ as = 'div', children, ...props }, ref) => {
  return createElement(as, { ...props, ref }, children);
});

export const SimpleBox = () => <Box>Hello</Box>;
export const HrefBox = () => <Box as="a" href="http://example.com"></Box>;
// @ts-expect-error
export const BrokenBox = () => <Box as="span" href="http://example.com"></Box>;

// Polymorpic Component
// ---------------
export type LinkOwnProps = { disabled?: boolean } & BoxOwnProps;
export type LinkProps = PolymorphicProps<LinkOwnProps, 'a'>;

export const Link = (({
  as = 'a',
  disabled,
  children,
  ...props
}: LinkProps) => {
  const ref = useRef<any>();
  const disabledProps = disabled ? { ariaDisabled: 'true' } : {};
  return (
    <Box {...props} {...disabledProps} as={as} ref={ref}>
      {children}
    </Box>
  );
}) as PolymorphicComponent<LinkOwnProps, 'a'>;

export const SimpleLink = () => (
  <Link href="https://github.com/marigold-ui/marigold">Click me!</Link>
);

const RouterLink: React.FC<{ to: string }> = ({ to, children }) => (
  <a href={to}>{children}</a>
);
export const IntegrateLinkWithRouter = () => (
  <Link as={RouterLink} to="/home">
    Some internal Link
  </Link>
);
