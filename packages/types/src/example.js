import React, { createElement, forwardRef, useRef } from 'react';
export const Box = forwardRef(({ as = 'div', children, ...props }, ref) => {
  return createElement(as, { ...props, ref }, children);
});
export const SimpleBox = () => React.createElement(Box, null, 'Hello');
export const HrefBox = () =>
  React.createElement(Box, { as: 'a', href: 'http://example.com' });
// @ts-expect-error
export const BrokenBox = () =>
  React.createElement(Box, { as: 'span', href: 'http://example.com' });
export const Link = ({ as = 'a', disabled, children, ...props }) => {
  const ref = useRef();
  const disabledProps = disabled ? { ariaDisabled: 'true' } : {};
  return React.createElement(
    Box,
    { ...props, ...disabledProps, as: as, ref: ref },
    children
  );
};
export const SimpleLink = () =>
  React.createElement(
    Link,
    { href: 'https://github.com/marigold-ui/marigold' },
    'Click me!'
  );
const RouterLink = ({ to, children }) =>
  React.createElement('a', { href: to }, children);
export const IntegrateLinkWithRouter = () =>
  React.createElement(
    Link,
    { as: RouterLink, to: '/home' },
    'Some internal Link'
  );
//# sourceMappingURL=example.js.map
