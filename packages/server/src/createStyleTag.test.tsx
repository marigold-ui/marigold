/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { useStyles } from '@marigold/system';

import { createStyleTag, createStyleTagString } from './createStyleTag';

// Setup
// ---------------
const Box: React.FC<{ css: any }> = ({ css, children }) => {
  const className = useStyles(css);
  return <div className={className}>{children}</div>;
};

const setup = () => {
  const app = (
    <div>
      <Box css={{ color: 'blue', textDecoration: 'underline' }}>Box!</Box>
    </div>
  );

  return { app };
};

test('create a <style> tag, which can be added to the head for client hydration', () => {
  const { app } = setup();
  const Style = createStyleTag(renderToString(app));

  const head = <Style />;
  expect(renderToString(head)).toMatchInlineSnapshot(
    `"<style data-emotion=\\"css ase7ea j0t7eu\\" data-reactroot=\\"\\">.css-ase7ea{box-sizing:border-box;margin:0;padding:0;min-width:0;font-size:100%;font:inherit;vertical-align:baseline;-webkit-tap-highlight-color:transparent;}.css-j0t7eu{color:blue;-webkit-text-decoration:underline;text-decoration:underline;}</style>"`
  );
});

test('create a <style> tag as string, which can be added to the head for client hydration', () => {
  const { app } = setup();
  const style = createStyleTagString(renderToString(app));

  expect(style).toMatchInlineSnapshot(
    `"<style data-emotion=\\"css ase7ea j0t7eu\\">.css-ase7ea{box-sizing:border-box;margin:0;padding:0;min-width:0;font-size:100%;font:inherit;vertical-align:baseline;-webkit-tap-highlight-color:transparent;}.css-j0t7eu{color:blue;-webkit-text-decoration:underline;text-decoration:underline;}</style>"`
  );
});
