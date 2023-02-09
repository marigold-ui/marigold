import React from 'react';
import { PolymorphicComponent } from '.';

type BoxOwnProps = {
  className?: string;
  children?: React.ReactNode;
};
// export type BoxProps<T extends React.ElementType> =
//   PolymorphicComponentPropsWithRef<T, BoxOwnProps>;

export const Box = React.forwardRef(({ as, children, ...props }, ref) => {
  return React.createElement(as || 'div', { ...props, ref }, children);
}) as PolymorphicComponent<'div', BoxOwnProps>;

export const SimpleBox = () => <Box>Hello</Box>;
// @ts-expect-error
export const NotAPropBox = () => <Box foo="bar">Hello</Box>;
export const HrefBox = () => <Box as="a" href="http://example.com"></Box>;
// @ts-expect-error
export const BrokenBox = () => <Box as="span" href="http://example.com"></Box>;
