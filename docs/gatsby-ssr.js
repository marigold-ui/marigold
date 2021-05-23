import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStyleTag } from '@marigold/server';

import { Layout } from './src/components/Layout';

export const replaceRenderer = ({ bodyComponent, setHeadComponents }) => {
  const Style = createStyleTag(renderToString(bodyComponent));
  setHeadComponents([<Style key="ssr-styles" />]);
};

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
