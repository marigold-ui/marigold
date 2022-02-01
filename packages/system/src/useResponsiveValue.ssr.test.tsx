/**
 * @jest-environment node
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useResponsiveValue } from './useResponsiveValue';

test("falls back to user's default index", () => {
  const Component = () => {
    const value = useResponsiveValue(['one', 'two'], 1);
    return <>{value}</>;
  };

  const root = ReactDOMServer.renderToStaticMarkup(<Component />);

  expect(root).toEqual('two');
});
