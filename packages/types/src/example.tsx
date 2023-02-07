import React, { createElement, forwardRef, ReactNode, useRef } from 'react';
import { PolymorphicProps } from '.';
import { PolymorphicComponent, PropsOf } from './polymorphic-component';

// Polymorpic Component with Ref
// ---------------
export type BoxOwnProps = { className?: string };
export type BoxProps = PropsOf<'div'> & BoxOwnProps;

// export const Box: PolymorphicComponentWithRef<BoxOwnProps, 'div'> = forwardRef<
//   HTMLDivElement,
//   PolymorphicProps<BoxOwnProps, 'div'>
// >(({ as = 'div', children, ...props }, ref) => {
//   return createElement(as, { ...props, ref }, children);
// });

export const Box = forwardRef(
  ({ as = 'div', children, ...props }: BoxProps, ref) => {
    return createElement(as, { ...props, ref }, children);
  }
) as PolymorphicComponent<'div', BoxOwnProps>;

export const SimpleBox = () => <Box>Hello</Box>;
export const HrefBox = () => <Box as="a" href="http://example.com"></Box>;
// @ts-expect-error
export const BrokenBox = () => <Box as="span" href="http://example.com"></Box>;

// Polymorpic Component
// ---------------
export type LinkOwnProps = { disabled?: boolean } & BoxOwnProps;
export type LinkProps = PolymorphicProps<LinkOwnProps, 'a'>;

export const Link: PolymorphicComponent<'a', LinkOwnProps> = ({
  as = 'a',
  disabled,
  children,
  ...props
}) => {
  const ref = useRef<any>();
  const disabledProps = disabled ? { ariaDisabled: 'true' } : {};
  return (
    <Box {...props} {...disabledProps} as={as} ref={ref}>
      {children}
    </Box>
  );
};

export const SimpleLink = () => (
  <Link href="https://github.com/marigold-ui/marigold">Click me!</Link>
);

export interface RouterLinkProps {
  children?: ReactNode;
  to: string;
}

const RouterLink = ({ to, children }: RouterLinkProps) => (
  <a href={to}>{children}</a>
);
export const IntegrateLinkWithRouter = () => (
  <Link as={RouterLink} to="/home">
    Some internal Link
  </Link>
);
