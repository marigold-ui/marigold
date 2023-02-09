import React from 'react';
import { PolymorphicComponent, PropsOf } from '.';

type BoxOwnProps = {
  className?: string;
  children?: React.ReactNode;
};

export type BoxProps = PropsOf<typeof Box>;

export const props: BoxProps = {
  className: 'box',
  title: 'inherited from <div>',
  // @ts-expect-error
  foo: 'bar',
};

export const Box = React.forwardRef(({ as, children, ...props }, ref) => {
  return React.createElement(as || 'div', { ...props, ref }, children);
}) as PolymorphicComponent<'div', BoxOwnProps>;

export const SimpleBox = () => <Box>Hello</Box>;
// @ts-expect-error
export const NotAPropBox = () => <Box foo="bar">Hello</Box>;
export const HrefBox = () => <Box as="a" href="http://example.com"></Box>;
// @ts-expect-error
export const BrokenBox = () => <Box as="span" href="http://example.com"></Box>;

// Used within forward ref
export const BoxUsedInForwardRef = React.forwardRef<
  React.ElementRef<typeof Box>,
  React.ComponentProps<typeof Box>
>((props, forwardedRef) => <Box {...props} ref={forwardedRef} />);
