/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { useStyles } from '@marigold/system';

import { renderStatic } from './renderStatic';

// const createHTML = ({ head = '', content = '' }) => `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="X-UA-Compatible" content="ie=edge">
//       <title>Some fancy HTML/title>
//       ${head}
//   </head>
//   <body>
//       ${content}
//   </body>
//   </html>
// `;

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

test('return required data to render on server', () => {
  const { app } = setup();
  const { ids, css } = renderStatic(renderToString(app));

  expect(ids.length).toBeGreaterThan(0);
  expect(css.length).toBeGreaterThan(0);
});

// TODO
/**
  <style
    data-emotion={`css ${ids.join(' ')}`}
    dangerouslySetInnerHTML={{ __html: css }}
  />
 */
