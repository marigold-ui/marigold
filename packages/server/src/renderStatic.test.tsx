/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { useStyles } from '@marigold/system';

import { renderStatic } from './renderStatic';

// Setup
// ---------------
const Box: React.FC<{ css: any }> = ({ css, children }) => {
  const className = useStyles(css);
  return <div className={className}>{children}</div>;
};

const setup = () => {
  const app = (
    <div>
      <Box css={{ color: 'red', fontSize: 32, fontWeight: 700 }}>Hello</Box>
      <Box css={{ color: 'hotpink', fontSize: 24 }}>there!</Box>
    </div>
  );

  return { app };
};

// Tests
// ---------------
test('return required data to render on server', () => {
  const { app } = setup();
  const { ids, css } = renderStatic(renderToString(app));

  expect(ids.length).toBeGreaterThan(0);
  expect(css.length).toBeGreaterThan(0);
});

test('uses "css" as key (this is the default for @emotion/css', () => {
  const { app } = setup();
  const { key } = renderStatic(renderToString(app));
  expect(key).toMatchInlineSnapshot(`"css"`);
});
